<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    
    public function Home(){
        $isUser = Auth::check();

        return inertia('Home',['isUser'=>$isUser]);
    }
    public function LandingPage(){
        $isUser = Auth::check();

        return inertia('LandingPage',['isUser'=>$isUser]); 
    }
}
