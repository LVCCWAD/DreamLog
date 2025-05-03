<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class BlogsController extends Controller
{
    public function createBlog(Request $request){

        $blog = $request->validate([
            'BlogTitle'=>['required','string','max:50'],
            'BlogDescription'=>['required','string',"max:100"],
            'Thumbnail' => ['nullable', 'file', 'mimes:jpg,png,pdf,gif', 'max:51200'],
        ]);

        if ($request->hasFile('Thumbnail')) {
            $file = $request->file('Thumbnail');
            $filePath = $file->store('Thumbnails', 'public'); 
            $blog['Thumbnail'] = $filePath;
        }
        
        $blog['user_id'] = auth()->guard('web')->id();
        $blog['Visibility'] = "private";

        Blog::create($blog);

        Log::info('Incoming request data:', $request->all());

    }

    public function showEditBlog(Blog $blog){
        $isUser = Auth::check();
        return Inertia("EditBlog",["blog"=>$blog, "isUser"=> $isUser]);
    }
}
