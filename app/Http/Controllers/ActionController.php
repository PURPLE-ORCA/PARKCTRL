<?php

namespace App\Http\Controllers;

use App\Models\Action;
use App\Http\Requests\StoreActionRequest;
use App\Http\Requests\UpdateActionRequest;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ActionController extends Controller
{
    public function show(Action $action)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Action $action)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateActionRequest $request, Action $action)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Action $action)
    {
        //
    }
}
