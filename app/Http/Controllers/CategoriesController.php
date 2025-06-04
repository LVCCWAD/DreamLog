<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CategoriesController extends Controller
{
    public function createCategory(Request $request){
        $category = $request->validate([
            'categoryName' => [
                'required',
                'string',
                'max:50',
                function ($attribute, $value, $fail) {
                    if (Category::whereRaw('LOWER(categoryName) = ?', [strtolower($value)])->exists()) {
                        $fail('The category name has already been taken.');
                    }
                }
            ],
            'thumbnail' => ['nullable', 'file', 'mimes:jpg,png,pdf,gif', 'max:51200'],
        ]);

         if ($request->hasFile('thumbnail')) {
            $file = $request->file('thumbnail');
            $filePath = $file->store('CategoryThumbnails', 'public'); 
            $category['thumbnail'] = $filePath;
        }

        $category['user_id'] = Auth::id();

        Category::create($category);
    }

    public function removeCategory(Request $request, Blog $blog){
        $blog->categories()->detach($request['category']);
    }

    public function deleteCategory(Request $request, Category $category){
        $category->delete();

    }
}
