<?php

namespace App\Listeners;

use App\Events\BlogDeleted;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

class DeleteImageComponents
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
    public function handle(BlogDeleted $event): void
    {
        info("Delete image components for blog: {$event->blog->title}");

        // Here you can implement the logic to delete the image components,
        // such as removing files from storage or deleting related database records.
        // For example:
        // $event->blog->imageComponents()->delete();
        // Storage::disk('public')->delete($event->blog->image_path);

        Storage::disk('public')->delete($event->blog->Thumbnail);

       $imageComponents = $event->blog->Components()->where("Type", "image")->get();

        foreach ($imageComponents as $imageComponent) {
            $imagePath = public_path('storage/' . $imageComponent->Content);

            if (File::exists($imagePath)) {
                unlink($imagePath);
            }
        }


    }
}
