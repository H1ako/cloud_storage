<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    //

    public function loginPage() {
        return inertia('LoginPage');
    }

    public function signUpPage() {
        return inertia('SignUpPage');
    }

    public function login(Request $request) {
        $validatedData = $request->validate([
            'email' => 'email|required',
            'password' => 'min:8|required'
        ]);

        if (Auth::attempt($validatedData)) {
            $request->session()->regenerate();

            return redirect()->route('home');
        }
        return redirect()->back();
    }

    public function signOut() {
        Auth::logout();

        return redirect()->route('login');
    }
}
