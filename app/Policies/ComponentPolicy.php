<?php

namespace App\Policies;

use App\Models\Blog;
use App\Models\Component;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class ComponentPolicy
{

    
    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Component $component): bool
    {
        return $user->id == $component->Blog->Creator->id;
    }

}
