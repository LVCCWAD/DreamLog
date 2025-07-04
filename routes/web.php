<?php

use App\Http\Controllers\BlogsController;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\NotificationsController;
use App\Http\Controllers\ProfilesController;
use App\Http\Controllers\UserAuth;
use App\Models\Blog;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Schedule;

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
    Route::get('/profile/{user}',[ProfilesController::class,'Profile']);
    Route::get('/blog/{blog}',[BlogsController::class,'BlogPage']);
    Route::post('/deletecomponent/{component}',[BlogsController::class, 'deleteComponent']);
    Route::post('/createcategory',[CategoriesController::class, 'createCategory']);
    Route::post('/blog/{blog}/update',[BlogsController::class, 'updateBlog']);
    Route::post('/category/{blog}/remove',[CategoriesController::class, 'removeCategory']);
    Route::post('/blog/{blog}/delete',[BlogsController::class, 'deleteBlog']);
    Route::post('/profile/{user}/follow',[ProfilesController::class,'follow']);
    Route::post('/profile/{user}/unfollow',[ProfilesController::class,'unFollow']);
    Route::post('like/blog',[ProfilesController::class,'like']);
    Route::post('unlike/blog',[ProfilesController::class,'unLike']);
    Route::post('/profile/update', [ProfilesController::class, 'updateProfile']);
    Route::get('/category/{category}', [BlogsController::class, 'getBlogsByCategory']);


    Route::post('/category/{category}/delete', [CategoriesController::class, 'deleteCategory']);
    Route::post('/createcomponents/{blog}/draft',[BlogsController::class, 'draftBlogComponents']);
    Route::post('/notification/{notification}/read',[NotificationsController::class, 'notificationRead']);

    Route::post('/notification/{notification}/delete',[NotificationsController::class, 'deleteNotification']);

    

});

Schedule::call(function () {
   $cutoff = Carbon::now()->subMonth();

        $blogs = Blog::where('Visibility', 'private')
            ->where('created_at', '<=', $cutoff)
            ->get();

        foreach ($blogs as $blog) {
            $blog->delete();
        }
        
})->monthly();