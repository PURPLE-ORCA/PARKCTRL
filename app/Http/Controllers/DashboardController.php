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
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
// app/Http/Controllers/DashboardController.php
public function index()
{
    return Inertia::render('Dashboard', [
        
    ]);
}

}
