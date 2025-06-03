<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

use Illuminate\Validation\ValidationException;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class UserAuth extends Controller
{
  public function register(Request $request)
    {
        $registration = $request->validate([
            'name' => ['required', Rule::unique('users', 'name')],
            'email' => ['required', 'email', Rule::unique('users', 'email')],
            'password' => ['required', 'min:8', 'max:200'],
        ]);

        $registration['password'] = bcrypt($registration['password']);

        try {
            $user = User::create($registration);
            $user->profile()->create([
                'userName' => '@' . $user->name,
            ]);

            auth()->guard('web')->login($user);

            return Inertia::location("/");
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['registration' => 'Registration failed: ' . $e->getMessage()])->withInput();
        }
    }

    public function login(Request $request)
    {
        $login = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        try {
            if (auth()->guard('web')->attempt(['email' => $login['email'], 'password' => $login['password']])) {
                $request->session()->regenerate();
                return Inertia::location("/");
            } else {
                return redirect()->back()->withErrors([
                    'email' => 'Credentials do not match our records.',
                ])->withInput($request->only('email'));
            }
            
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['login' => 'Login failed: ' . $e->getMessage()])->withInput($request->only('email'));
        }
    }

     public function logout(){
        Auth::logout();

        return Inertia::location("/");
        
    }
}
