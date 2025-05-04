<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Component;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

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
        

        return redirect("/editblog/{$createdBlog->id}");

        

    }

    public function showEditBlog(Blog $blog){
        $isUser = Auth::check();
        $blogComponents = $blog->Components;

        return Inertia("EditBlog",["blog"=>$blog, "isUser"=> $isUser, "blogComponents"=>$blogComponents]);
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
    }

    public function Profile (User $user){
        $userBlogs = $user->Blogs;
        $userBlogs->load('Creator');
        $isUser = Auth::check();


        return inertia('ProfilePage',['user'=>$user,'userBlogs'=>$userBlogs,"isUser" => $isUser]);
    }

    public function BlogPage(Blog $blog){
        $isUser = Auth::check();
        $user = Auth::user();
        $components = $blog->Components;

        return inertia('BlogPage',["blog"=>$blog,"isUser"=>$isUser,"user"=>$user,"components"=> $components]);
    }

    public function deleteComponent(Component $component){
        $component->delete();
    }
}
