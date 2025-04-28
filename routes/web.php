<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\UserAuth;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;



Route::middleware('notAuth')->group(function (){

    Route::get('/landingpage',[HomeController::class,'LandingPage']);

    Route::post('/register',[UserAuth::class, 'register']);
    Route::post('/login',[UserAuth::class, 'login']);

});


Route::middleware('isAuth')->group(function (){
    Route::post('/logout',[UserAuth::class, 'logout']);
    Route::get('/',[HomeController::class,'Home']);

});