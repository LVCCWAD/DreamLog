<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Category;
use App\Models\Component;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class BlogsController extends Controller
{
    public function createBlog(Request $request){

        $blog = $request->validate([
            'BlogTitle'=>['required','string','max:50'],
            'BlogDescription'=>['required','string',"max:100"],
            'Thumbnail' => ['nullable', 'file', 'mimes:jpg,png,pdf,gif', 'max:51200'],
        ]);

        

        if ($request->hasFile('Thumbnail')) {
            $file = $request->file('Thumbnail');
            $filePath = $file->store('Thumbnails', 'public'); 
            $blog['Thumbnail'] = $filePath;
        }
        
        $blog['user_id'] = auth()->guard('web')->id();
        $blog['Visibility'] = "private";

        $createdBlog = Blog::create($blog);

        

        $categories = $request->input('categories', []);
        if (!empty($categories)) {
            $createdBlog->categories()->attach($categories);
        }
        

        return redirect("/editblog/{$createdBlog->id}");

        

    }

    public function updateBlog(Request $request,Blog $blog){

        $updateBlog = $request->validate([
            'BlogTitle'=>['required','string','max:50'],
            'BlogDescription'=>['required','string',"max:100"],
            'Thumbnail' => ['nullable', 'file', 'mimes:jpg,png,pdf,gif', 'max:51200'],
        ]);

        

        if ($request->hasFile('Thumbnail') && $request['Thumbnail'] != null) {
            $file = $request->file('Thumbnail');
            $filePath = $file->store('Thumbnails', 'public'); 
            $updateBlog['Thumbnail'] = $filePath;
        }else{
            $updateBlog['Thumbnail'] = $blog->Thumbnail;
        }
        
        
        

        $blog->update($updateBlog);

        $categories = $request->input('categories', []);
        if (!empty($categories)) {
            $blog->categories()->attach($categories);
        }

        

        return redirect("/editblog/{$blog->id}");

    }

    public function showEditBlog(Blog $blog){
        $isUser = Auth::check();
        $blogComponents = $blog->Components;
        $blog->load(['Creator','likes']);
        $categories = Category::all();

        return Inertia("EditBlog",["blog"=>$blog, "isUser"=> $isUser, "blogComponents"=>$blogComponents, "categories"=> $categories]);
    }

    public function createBlogComponents(Request $request,Blog $blog){
        foreach($request->Components as $component){
            if ($component["type"] == "text") {
                if (!empty($component["id"])) {
                    
                    $comp = Component::find($component["id"]);
                   if ($comp && !empty($component["content"])) {
                        $comp->Content = $component["content"];
                        $comp->Position = $component["position"];
                        $comp->save();
                    }
                } else {
                    
                    Component::create([
                        "Position" => $component["position"],
                        "Type" => "text",
                        "Content" => $component["content"],
                        "blog_id" => $blog->id
                    ]);
                }
            }
            else if ($component["type"] == "image") {
                if (!empty($component["id"])) {
                    
                    $comp = Component::find($component["id"]);
                    if ($comp && isset($component['content']) && is_array($component['content']) &&
                            isset($component['content']['file']) && $component['content']['file']->isValid()) {

                            $file = $component['content']['file'];
                            $filePath = $file->store('Component', 'public');
                            $comp->Content = $filePath;
                            $comp->save();
                    }
                } else {
                   
                    $newComponent = [
                        "Position" => $component["position"],
                        "Type" => "image",
                        "blog_id" => $blog->id,
                        "Content" => null
                    ];
            
                    if (isset($component['content']) && is_array($component['content']) &&
                        isset($component['content']['file']) && $component['content']['file']->isValid()) {
                        $file = $component['content']['file'];
                        $filePath = $file->store('Component', 'public');
                        $newComponent['Content'] = $filePath;
                    }
            
                    Component::create($newComponent);
                }
            }
            
        }

        $blog->Visibility = "public";
        $blog->save();

        Log::info('Incoming request data:', $request->all());

        return redirect("/blog/{$blog->id}");
    }

    

    public function BlogPage(Blog $blog){
        $isUser = Auth::check();
        $user = Auth::user();
        $components = $blog->Components;
        $blog->load(['Creator','Creator.followers','likes']);
        $blog->load('categories');
        $categories = Category::all();


        return inertia('BlogPage',["blog"=>$blog,"isUser"=>$isUser,"user"=>$user,"components"=> $components, "categories"=> $categories]);
    }

    public function deleteComponent(Component $component){
        $component->delete();
    }

    public function createCategory(Request $request){
        $category = $request->validate([
            'categoryName'=>['required','string','max:50'],
            'thumbnail' => ['nullable', 'file', 'mimes:jpg,png,pdf,gif', 'max:51200'],
        ]);

         if ($request->hasFile('thumbnail')) {
            $file = $request->file('thumbnail');
            $filePath = $file->store('CategoryThumbnails', 'public'); 
            $category['thumbnail'] = $filePath;
        }

        Category::create($category);
    }

    public function removeCategory(Request $request, Blog $blog){
        $blog->categories()->detach($request['category']);
    }

    public function deleteBlog(Request $request,Blog $blog){
        $blog->delete();

        return redirect('/');
    }

    public function follow(Request $request)
        {
            Auth::user()->followings()->attach($request->user_id);
        }

    public function unFollow(Request $request)
        {
            Auth::user()->followings()->detach($request->user_id);
        }

    public function like(Request $request)
    {
        $user = Auth::user();
        $user->liked_blogs()->syncWithoutDetaching([$request->blog_id]);
        return back();
    }

    public function unlike(Request $request)
    {
        $user = Auth::user();
        $user->liked_blogs()->detach($request->blog_id);
        return back();
    }
    
}
