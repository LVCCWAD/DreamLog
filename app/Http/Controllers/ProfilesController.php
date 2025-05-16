<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ProfilesController extends Controller
{
    public function Profile (User $user){
        $user->load([
        'profile',
        'followings',
        'followers',
        'blogs.creator',  // eager load nested creator
        'blogs.likes'     // eager load blog likes
    ]);

    $userBlogs = $user->blogs;

    $isUser = Auth::check();
    $categories = Category::all();

    $authUser = Auth::user();

    if ($authUser) {
        $authUser->load(['followings', 'liked_blogs']);
    }
        


        return inertia('ProfilePage',['user'=>$user,'userBlogs'=>$userBlogs,"isUser" => $isUser, 'authUser' => $authUser, 'categories'=>$categories ]);
    }

    public function updateProfile(Request $request)
    {
        $request->validate([
            'userName' => 'required|string|max:255',
            'bio' => 'nullable|string|max:500',
            'profilePicture' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'banner' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $user = Auth::user();
        
        
        if ($request->hasFile('profilePicture')) {
            
            if ($user->profile_picture) {
                Storage::disk('public')->delete($user->profile_picture);
            }
            
            
            $profilePicturePath = $request->file('profilePicture')->store('profile_pictures', 'public');
            $user->profile->profilePicture = $profilePicturePath;
        }
        
        
        if ($request->hasFile('banner')) {
            
            if ($user->banner) {
                Storage::disk('public')->delete($user->banner);
            }
            
            
            $bannerPath = $request->file('banner')->store('banners', 'public');
            $user->profile->banner = $bannerPath;
        }
        
        if($request->userName){
             $user->profile->userName = $request->userName;
        }

        if($request->bio){
              $user->profile->bio = $request->bio;
        }
       
       
        $user->profile->save();
        
        return redirect()->back()->with('success', 'Profile updated successfully!');
    }


}
