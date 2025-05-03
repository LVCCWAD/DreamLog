<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    protected $fillable = [
        'BlogTitle',
        'BlogDescription',
        'Visibility',
        'Thumbnail',
        'user_id'
        
    ];

    public function Components(){
        return $this->hasMany(Component::class,'blog_id');
    }

    public function Creator(){
        return $this->belongsTo(User::class,'user_id');
    }
}
