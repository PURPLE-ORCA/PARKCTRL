<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $user = auth::user();

        $query = Product::query();

        // Only apply service-based filtering if the user is NOT an admin
        if (!$user->isAdmin()) {
            $query->where('served_to', $user->service_id);
        }

        // Search
        $query->when($request->search, function ($q, $search) {
            $q->where(function ($subQuery) use ($search) {
                $subQuery->where('name', 'like', "%{$search}%")
                    ->orWhere('supplier', 'like', "%{$search}%")
                    ->orWhere('id', 'like', "%{$search}%")
                    ->orWhere('price', 'like', "%{$search}%")
                    ->orWhere('serial_number', 'like', "%{$search}%");
            });
        });

        // Sorting
        $query->orderBy(
            $request->sort_by ?? 'name',
            $request->sort_order ?? 'asc'
        );

        $products = $query->with('service')->paginate(20);

        return Inertia::render('Products/ProductList', [
            'products' => $products,
            'filters' => $request->only(['search', 'sort_by', 'sort_order']),
        ]);
    }

    public function create()
    {
        $services = Service::all();
        return Inertia::render('Products/ProductCreate', [
            'services' => $services,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:150',
            'serial_number' => 'required|string|max:100',
            'supplier' => 'required|string|max:150',
            'quantity' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0',
            'served_to' => 'nullable|exists:services,id',
        ]);

        $quantity = $request->quantity;
        $initialSerial = $request->serial_number;

        if (!preg_match('/^(.*?)(\d+)$/', $initialSerial, $matches)) {
            return Redirect::back()->withErrors([
                'serial_number' => 'Invalid serial number format. Please use a format like MONI-001.',
            ]);
        }

        $prefix = $matches[1];
        $number = $matches[2];
        $numberLength = strlen($number);
        $startingNumber = intval($number);

        try {
            DB::transaction(function () use ($request, $quantity, $prefix, $startingNumber, $numberLength) {
                for ($i = 0; $i < $quantity; $i++) {
                    $currentNumber = $startingNumber + $i;
                    $newSerial = $prefix . str_pad($currentNumber, $numberLength, '0', STR_PAD_LEFT);

                    if (Product::where('serial_number', $newSerial)->exists()) {
                        throw new \Exception("Serial number {$newSerial} already exists.");
                    }

                    Product::create([
                        'name' => $request->name,
                        'serial_number' => $newSerial,
                        'supplier' => $request->supplier,
                        'price' => $request->price,
                        'served_to' => $request->served_to,
                    ]);
                }
            });
        } catch (\Exception $e) {
            return Redirect::back()->withErrors(['serial_number' => $e->getMessage()]);
        }

        return Redirect::route('products.index')->with('success', 'Product created successfully!');
    }

    public function show(Product $product)
    {
        //
    }

    public function edit(Product $product)
    {
        $services = Service::all();
        return Inertia::render('Products/ProductEdit', [
            'product' => $product,
            'services' => $services,
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $request->validate([
            'name' => 'required|string|max:150',
            'serial_number' => 'required|string|unique:products,serial_number,' . $product->id . '|max:100',
            'supplier' => 'required|string|max:150',
            'price' => 'required|numeric|min:0',
            'served_to' => 'nullable|exists:services,id',
        ]);

        $product->update($request->all());

        return Redirect::route('products.index')->with('success', 'Product updated successfully!');
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return Redirect::route('products.index')->with('success', 'Product deleted successfully!');
    }
}
