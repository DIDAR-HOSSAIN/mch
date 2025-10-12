<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        config(['app.locale' => 'bn']);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        config(['app.locale' => 'bn']);
    }
}
