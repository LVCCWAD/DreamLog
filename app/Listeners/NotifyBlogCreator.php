<?php

namespace App\Listeners;

use App\Events\UserLiked;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class NotifyBlogCreator
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(UserLiked $event): void
    {
        info("Notify blog creator about the like on blog: {$event->blog->title} by user: {$event->user->name}");
        
        // Here you can implement the logic to notify the blog creator,
        // such as sending an email or a notification.
        // For example:
        // $event->blog->creator->notify(new BlogLikedNotification($event->user, $event->blog));
        $event->blog->Creator->notifications()->create([
            "type" => "like",
            "message" => "Your Blog: {$event->blog->BlogTitle} is liked by {$event->user->name}",
            "url"=>"/blog/{$event->blog->id}"
        ]);
    }
}
