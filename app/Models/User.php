<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function Blogs(){
        return $this->hasMany(Blog::class,'user_id');
    }
    
    public function followings()
    {
        return $this->belongsToMany(User::class, 'user_follower', 'follower_id', 'user_id')->withTimestamps();
    }

   
    public function followers()
    {
        return $this->belongsToMany(User::class, 'user_follower', 'user_id', 'follower_id')->withTimestamps();
    }

    public function profile(){
        return $this->hasOne(Profile::class,'user_id');
    }
}
