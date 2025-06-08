<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    
    public function Home(){

        if(Auth::check()){
            $blogs = Blog::where('visibility', 'public')->get();
            $blogs->load(['Creator','Creator.profile','likes','categories']);
            $categories = Category::all();
        }
        
        return inertia('Home',['blogs'=>$blogs, 'categories'=>$categories]);
    }
    public function LandingPage(){
        

        return inertia('LandingPage'); 
    }
}
