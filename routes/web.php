<?php

use App\Http\Controllers\UserAuth;
use Illuminate\Support\Facades\Route;


Route::get('/', function () {
    return inertia('LandingPage');
});

Route::post('/register',[UserAuth::class, 'register']);
Route::post('/login',[UserAuth::class, 'login']);