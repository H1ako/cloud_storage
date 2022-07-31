<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class HomeController extends Controller
{
    public function index() {
        // $newUser = new User(['email' => 'nikita@yandex.ru', 'name' => 'Nikita']);
        // $newUser->setPassword('25256789');
        // $newUser->save();
        $userA = User::where('email', 'nikita@yandex.ru')->first();
        Auth::login($userA);

        $user = Auth::user();
        $files = $user ? $user->files()->orderBy('created_at', 'DESC')->get() : [];

        return inertia('HomePage', [
            'user' => $user,
            'files' => $files
        ]);
    }
}
