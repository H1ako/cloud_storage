<?php

use App\Http\Controllers\FilesController;
use App\Http\Middleware\EnsureShareLinkIsValid;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Route;


Route::get('/', function() {
    /** @var \App\Models\User $user **/
    $user = Auth::user();
    // $f = $user->files;
    // $n = 0;
    // foreach($f as $fi) {
    //     $fi->update([
    //         'order' => $n
    //     ]);
    //     $n++;
    // }
    $files = $user->files()->where('isDeleted', false)->orderBy('order')->get();

    return inertia('HomePage', [
        'files' => $files
    ]);
})->middleware('auth')->name('home');

Route::get('/shared', function() {
    /** @var \App\Models\User $user **/
    $user = Auth::user();
    $files = $user->files()->where('shareLink', '!=', NULL)->where('isDeleted', false)->orderBy('order')->get();

    return inertia('HomePage', [
        'files' => $files
    ]);
})->middleware('auth')->name('shared');

Route::get('/trash', function() {
    /** @var \App\Models\User $user **/
    $user = Auth::user();
    $files = $user->files()->where('isDeleted', true)->orderBy('order')->get();

    return inertia('HomePage', [
        'files' => $files
    ]);
})->middleware('auth')->name('trash');

Route::get('/last', function() {
    /** @var \App\Models\User $user **/
    $user = Auth::user();
    $files = $user->lastCheckedFiles()->orderBy('updated_at', 'DESC')->get()->pluck('file');

    return inertia('HomePage', [
        'files' => $files
    ]);
})->middleware('auth')->name('last');

Route::get('/login', function() {
    // $newUser = new User(['email' => 'nikita@yandex.ru', 'name' => 'Nikita']);
    // $newUser->setPassword('25256789');
    // $newUser->save();
    $userA = User::where('email', 'nikita@yandex.ru')->first();
    Auth::login($userA);
    return redirect()->route('home');
})->name('login');


Route::prefix('api')->middleware('auth')->group(function () {
    Route::resource('files', FilesController::class)->except(['create', 'edit', 'show', 'index']);
});

Route::get('files/{shareLink}', [FilesController::class, 'show'])->middleware(EnsureShareLinkIsValid::class);
Route::get('storage/userFiles/{filePath}', [FilesController::class, 'showFullSize'])->where('filePath', '.*');