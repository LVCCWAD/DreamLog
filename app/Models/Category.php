<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = [
        'categoryName',
        'thumbnail'
    ];

    public function blogs()
    {
        return $this->belongsToMany(Blog::class);
    }



}
