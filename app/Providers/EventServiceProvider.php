<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }

    protected $listen = [
            \App\Events\BlogCreated::class => [
                \App\Listeners\NotifyFollowers::class,
            ],
            \App\Events\BlogDeleted::class => [
                \App\Listeners\DeleteImageComponents::class,
            ],
            \App\Events\UserFollowed::class => [
                \App\Listeners\NotifyUserFollowing::class,
            ],
            \App\Events\UserLiked::class => [
                \App\Listeners\NotifyBlogCreator::class,
            ],
        ];
}
    
    
