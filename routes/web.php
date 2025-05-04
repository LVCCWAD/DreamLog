<?php

use App\Http\Controllers\BlogsController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\UserAuth;
use App\Models\Blog;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;



Route::middleware('guest')->group(function (){

    Route::get('/landingpage',[HomeController::class,'LandingPage'])->name('login');

    Route::post('/register',[UserAuth::class, 'register']);
    Route::post('/login',[UserAuth::class, 'login']);

});


Route::middleware('auth')->group(function (){
    Route::post('/logout',[UserAuth::class, 'logout']);
    Route::get('/',[HomeController::class,'Home']);
    Route::post('/createblog',[BlogsController::class, 'createBlog']);
    Route::get('/editblog/{blog}',[BlogsController::class,'showEditBlog']);
    Route::post('/createcomponents/{blog}',[BlogsController::class, 'createBlogComponents']);
    Route::get('/profile/{user}',[BlogsController::class,'Profile']);
    Route::get('/blog/{blog}',[BlogsController::class,'BlogPage']);
    Route::post('/deletecomponent/{component}',[BlogsController::class, 'deleteComponent']);
});