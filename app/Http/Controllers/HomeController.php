<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    
    public function Home(){
        $isUser = Auth::check();
        $blogs = Blog::all();
        $blogs->load('Creator');

        
        return inertia('Home',['isUser'=>$isUser,'blogs'=>$blogs]);
    }
    public function LandingPage(){
        $isUser = Auth::check();

        return inertia('LandingPage',['isUser'=>$isUser]); 
    }
}
