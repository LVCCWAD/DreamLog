<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Component extends Model
{
    protected $fillable = [
        'Type',
        'Content',
        'Position',
        'blog_id'
        
    ];

    public function Blog(){
        return $this->belongsTo(Blog::class,'blog_id');
    }
}
