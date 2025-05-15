<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    
    public function Home(){
        $isUser = Auth::check();
        $blogs = Blog::all();
        $blogs->load(['Creator','Creator.followers']);
        $categories = Category::all();
        $authUser = Auth::user();

        
        return inertia('Home',['isUser'=>$isUser,'blogs'=>$blogs, 'categories'=>$categories, 'authUser'=>$authUser]);
    }
    public function LandingPage(){
        $isUser = Auth::check();

        return inertia('LandingPage',['isUser'=>$isUser]); 
    }
}
