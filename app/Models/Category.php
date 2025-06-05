<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = [
        'categoryName',
        'thumbnail',
        'user_id'
    ];

    public function blogs()
    {
        return $this->belongsToMany(Blog::class);
    }

    public function created_by(){
        return $this->belongsTo(User::class);
    }



}
