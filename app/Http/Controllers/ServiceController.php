<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;

class ServiceController extends Controller
{
    public function index(Request $request)
    {
        if (!Gate::allows('is_admin')) {
            abort(403, 'Administratreur seulement');
        }
        $query = Service::withCount('users'); 

        if ($request->has('search')) {
            $query->where('name', 'like', "%{$request->input('search')}%");
        }

        $query->orderBy($request->sort_by ?? 'name', $request->sort_order ?? 'asc');

        $services = $query->paginate(10);

        return Inertia::render('Services/ServiceList', [
            'services' => $services,
            'filters' => $request->only(['search', 'sort_by', 'sort_order']),
        ]);
    }

    public function create()
    {
        if (!Gate::allows('is_admin')) {
            abort(403, 'Administratreur seulement');
        }
        return Inertia::render('Services/ServiceCreate');
    }
    public function store(Request $request)
    {
        if (!Gate::allows('is_admin')) {
            abort(403, 'Administratreur seulement');
        }
        
        $request->validate([
            'name' => 'required|string|max:255|unique:services',
            'description' => 'required|string|max:255',
        ]);

        Service::create([
            'name' => $request->name,
            'description' => $request->description,
        ]);

        return Redirect::route('services.index')->with('success', 'Service created successfully!');
    }

    public function edit(Service $service)
    {
        if (!Gate::allows('is_admin')) {
            abort(403, 'Administratreur seulement');
        }
        return Inertia::render('Services/ServiceEdit', [
            'service' => $service,
        ]);
    }

    public function update(Request $request, Service $service)
    {
        if (!Gate::allows('is_admin')) {
            abort(403, 'Administratreur seulement');
        } 
        $request->validate([
            'name' => 'required|string|max:255|unique:services,name,' . $service->id,
            'description' => 'nullable|string',
        ]);

        $service->update([
            'name' => $request->name,
            'description' => $request->description,
        ]);

        return Redirect::route('services.index')->with('success', 'Service updated successfully!');
    }
    public function destroy(Service $service)
    {
        if (!Gate::allows('is_admin')) {
            abort(403, 'Administratreur seulement');
        }
        $service->delete();
        return Redirect::route('services.index')->with('success', 'Service deleted successfully!');
    }
}