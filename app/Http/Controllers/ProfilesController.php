<?php

namespace App\Http\Controllers;

use App\Events\UserFollowed;
use App\Events\UserLiked;
use App\Models\Blog;
use App\Models\Category;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;

class ProfilesController extends Controller
{
    public function Profile (User $user){
        $user->load([
        'profile',
        'followings',
        'followers',
        'blogs.creator', 
        'blogs.likes' ,
        'blogs.creator.profile',    
    ]);

    $userBlogs = $user->blogs;

    
    

    

    
        


        return inertia('ProfilePage',['user'=>$user,'userBlogs'=>$userBlogs ]);
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

    public function follow(Request $request)
        {
            Auth::user()->followings()->attach($request->user_id);
            UserFollowed::dispatch(Auth::user(), User::find($request->user_id));
        }

    public function unFollow(Request $request)
        {
            Auth::user()->followings()->detach($request->user_id);
        }

    public function like(Request $request)
    {
        $user = Auth::user();
        $user->liked_blogs()->syncWithoutDetaching([$request->blog_id]);
        $blog = Blog::find($request->blog_id);
        UserLiked::dispatch($user,$blog);
        return back();
    }

    public function unlike(Request $request)
    {
        $user = Auth::user();
        $user->liked_blogs()->detach($request->blog_id);
        return back();
    }


}
