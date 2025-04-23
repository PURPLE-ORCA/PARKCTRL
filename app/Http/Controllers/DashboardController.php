<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use App\Models\Action;
use App\Models\HelpRequest;
use App\Models\Product;
use App\Models\Service;
use App\Models\User;
use App\Models\Notification;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
            $user     = Auth::user();
            $isAdmin  = $user->isAdmin();
            $cacheKey = 'dashboard_data_' . $user->id;

            $dashboardData = Cache::remember($cacheKey, 60 * 5, function () use ($user, $isAdmin) {
            // Get products with service information
            $products = Product::with('service')->get();
            
             // Base product query
            $productQ = Product::query()
                ->when(! $isAdmin, fn($q) => $q->where('served_to', $user->service_id));
            // Get recent actions with related models
            $recentActions = Action::with(['user', 'product'])
                ->orderBy('created_at', 'desc')
                ->take(10)
                ->get();
            
            // Get help requests with details
            $helpRequests = HelpRequest::with(['user', 'product'])
                ->where('status', '!=', 'closed')
                ->orderBy('created_at', 'desc')
                ->take(5)
                ->get();
            
            // Since there's no quantity field, we'll use lowest price products 
            // as a placeholder for "low stock" items
            $lowStockItems = Product::orderBy('price', 'asc')
                ->take(5)
                ->get();
            
            // Get top services by product count
            $topServices = DB::table('products')
                ->join('services', 'products.served_to', '=', 'services.id')
                ->select('services.id', 'services.name', DB::raw('COUNT(*) as count'))
                ->whereNotNull('served_to')
                ->groupBy('services.id', 'services.name')
                ->orderBy('count', 'desc')
                ->take(5)
                ->get()
                ->map(function ($service) {
                    return [
                        'name' => $service->name ?? 'Unassigned',
                        'count' => $service->count,
                    ];
                })
                ->toArray();

            // Add "unassigned" category if there are any products without a service
            $unassignedCount = Product::whereNull('served_to')->count();
            if ($unassignedCount > 0) {
                $topServices[] = [
                    'name' => 'Unassigned',
                    'count' => $unassignedCount
                ];
            }
            
            // Get unread notifications for current user
            $notifications = Notification::where('user_id', Auth::id())
                ->where('is_read', false)
                ->orderBy('created_at', 'desc')
                ->take(5)
                ->get();
            
            // Calculate key stats
            $stats = [
                'totalProducts'       => (clone $productQ)->count(),
                'totalValue'          => (clone $productQ)->sum('price'),
                'pendingHelpRequests' => HelpRequest::whereIn('status', ['pending', 'in_progress'])->count(),
                'unreadNotifications' => Notification::where('user_id', Auth::id())->where('is_read', false)->count(),
                'totalHelpRequests'   => HelpRequest::count(),
                'inventoryTrend'      => $this->getInventoryTrends($user, $isAdmin),
                'supplierStats'       => $this->getSupplierStats($user, $isAdmin),
            ];
            
            return [
                'products' => $products,
                'recentActions' => $recentActions,
                'helpRequests' => $helpRequests,
                'lowStockItems' => $lowStockItems,
                'topServices' => $topServices,
                'notifications' => $notifications,
                'userCount' => User::count(),
                'stats' => $stats,
            ];
        });
        
        return Inertia::render('Dashboard', $dashboardData);
    }
    private function getInventoryTrends($user, $isAdmin)
    {
        $trends = [];
        for ($i = 5; $i >= 0; $i--) {
            $date = Carbon::now()->subMonths($i)->endOfMonth();

            $q = Product::whereDate('created_at', '<=', $date)
                        ->when(! $isAdmin, fn($q) => $q->where('served_to', $user->service_id));

            $trends[] = [
                'month' => $date->format('M Y'),
                'count' => $q->count(),
                'value' => round($q->sum('price'), 2),
            ];
        }
        return $trends;
    }

    private function getSupplierStats($user, $isAdmin)
    {
        $qb = DB::table('products')
            ->select('supplier', DB::raw('COUNT(*) as count'), DB::raw('SUM(price) as value'))
            ->when(! $isAdmin, fn($q) => $q->where('served_to', $user->service_id))
            ->groupBy('supplier')
            ->orderByDesc('count')
            ->take(5)
            ->get();

        return $qb->map(fn($item) => [
            'supplier' => $item->supplier,
            'count'    => $item->count,
            'value'    => round($item->value, 2),
        ])->toArray();
    }
}