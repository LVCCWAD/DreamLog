<?php

namespace App\Listeners;

use App\Events\BlogCreated;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Auth;

class NotifyFollowers
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
    public function handle(BlogCreated $event): void
    {
        info("Notify followers about the new blog: {$event->blog->BlogTitle}");

        $followers = Auth::user()->followers;
        $creator = Auth::user();

        foreach($followers as $follower){
            $follower->notifications()->create([
            "type" => "New Blog",
            "message" => "New Blog is Created by {$creator->name} Blog Title: {$event->blog->BlogTitle}",
            "url"=>"/blog/{$event->blog->id}"
            ]);
        }
    }
}
