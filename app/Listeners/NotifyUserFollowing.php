<?php

namespace App\Listeners;

use App\Events\UserFollowed;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class NotifyUserFollowing
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
    public function handle(UserFollowed $event): void
    {
        info("Notify user {$event->followedUser->name} that they have been followed by {$event->follower->name}");

        // Here you can implement the logic to notify the followed user,
        // such as sending an email or a notification.
        // For example:
        // $event->followedUser->notify(new UserFollowedNotification($event->follower));

        $event->followedUser->notifications()->create([
            "type" => "New Follower",
            "message" => "You are followed by {$event->follower->name}",
            "url"=>"/profile/{$event->follower->id}"
            ]);
    }
}
