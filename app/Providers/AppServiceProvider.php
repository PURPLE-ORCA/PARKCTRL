<?php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        // Gate::define('is_general_manager', function ($user) {
        //     return $user->hasRole('general_manager');
        // });
        // Gate::define('is_magazine_manager', function ($user) {
        //     return $user->hasRole('magazine_manager');
        // });

    }
}
