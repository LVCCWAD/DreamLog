<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $fillable = [
        
        'profilePicture',
        'banner',
        'userName',
        'bio',
        'user_id'
        
    ];

    public function user(){
        return $this->belongsTo(User::class,'user_id');
    }
}
