<?php

namespace App\Http\Controllers;

use App\Events\BlogCreated;
use App\Events\BlogDeleted;
use App\Models\Blog;
use App\Models\Category;
use App\Models\Component;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class BlogsController extends Controller
{
    public function createBlog(Request $request)
    {
        $validated = $request->validate([
            'BlogTitle' => ['required', 'string', 'max:50'],
            'BlogDescription' => ['required', 'string', 'max:100'],
            'Thumbnail' => ['nullable', 'file', 'mimes:jpg,jpeg,png,pdf,gif', 'max:51200'],
            'categories' => ['nullable', 'array'],
            'categories.*' => ['integer', 'exists:categories,id'],
        ]);

        if ($request->hasFile('Thumbnail')) {
            $file = $request->file('Thumbnail');
            $filePath = $file->store('Thumbnails', 'public');
            $validated['Thumbnail'] = $filePath;
        }

        $validated['user_id'] = auth()->guard('web')->id();
        $validated['Visibility'] = 'private';

        $createdBlog = Blog::create($validated);

        if (!empty($validated['categories'])) {
            $createdBlog->categories()->attach($validated['categories']);
        }

        return redirect("/editblog/{$createdBlog->id}");
    }

    public function updateBlog(Request $request,Blog $blog){

         Gate::authorize('update', $blog);

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

        Gate::authorize('view', $blog);

        $blogComponents = $blog->Components;
        $blog->load(['Creator','likes','categories']);
        $categories = Category::all();

        
       

        return Inertia("EditBlog",["blog"=>$blog, "blogComponents"=>$blogComponents, "categories"=> $categories]);
    }

    public function createBlogComponents(Request $request,Blog $blog){

         Gate::authorize('update', $blog);

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

        BlogCreated::dispatch($blog);

        Log::info('Incoming request data:', $request->all());

        return redirect("/blog/{$blog->id}");
    }

    

    public function BlogPage(Blog $blog){
       
       
        $components = $blog->Components;
        $blog->load(['Creator','Creator.followers','likes','Creator.profile','categories']);
        $categories = Category::all();
        if($blog->Visibility == "public"){
        $blog->increment('view_count');}


        return inertia('BlogPage',["blog"=>$blog,"components"=> $components, "categories"=> $categories]);
    }

    public function deleteComponent(Component $component){
        Gate::authorize('delete', $component);
        $component->delete();
    }

    

    public function deleteBlog(Request $request,Blog $blog){
        Gate::authorize('delete', $blog);
        BlogDeleted::dispatch($blog);
        $blog->delete();

        return redirect('/');
    }

    

    public function getBlogsByCategory(Category $category)
    {
        $blogs = $category->blogs()->where('Visibility', 'public')->with(['Creator','Creator.profile', 'likes'])->get();
        return inertia('CategoryBlogs', ['blogs' => $blogs, 'category' => $category]);
    }

    
    
}
