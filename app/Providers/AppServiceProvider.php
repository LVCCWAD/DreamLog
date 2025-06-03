<?php

namespace App\Providers;

use App\Models\Blog;
use App\Policies\BlogPolicy;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

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
         Inertia::share([
        'auth' => function () {
            return [
                'user' => Auth::check() ? Auth::user()->load(['profile', 'followings', 'liked_blogs','notifications']) : null,
                'isUser' => Auth::check(),
                
                

            ];
        },
        'categories' => function () {
            return \App\Models\Category::all();
        },
        'blogs' => function () {
                return Blog::where('Visibility', 'public')->with('Creator')->get();
            },
            'url' => env('APP_URL'),
        
    ]);
    }

   
}
