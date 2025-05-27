<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoriesController extends Controller
{
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
}
