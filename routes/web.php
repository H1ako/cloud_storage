<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\FilesController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\UserController;
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
    $files = $user->files()->where('isDeleted', false)->where('shareLink', '!=', NULL)->orderBy('order')->get();

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

Route::get('/login', [AuthController::class, 'loginPage'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::get('/sign-up', [AuthController::class, 'signUpPage'])->name('signUp');


Route::prefix('api')->group(function () {
    Route::resource('files', FilesController::class)->except(['create', 'edit', 'show', 'index'])->middleware('auth');
    Route::resource('user', UserController::class)->only(['show', 'update', 'destroy'])->middleware('auth');
    Route::post('/user/subscription/{subscirptionId}', [UserController::class, 'updateSubscription'])->middleware('auth');
});

Route::get('files/{shareLink}', [FilesController::class, 'show'])->middleware(EnsureShareLinkIsValid::class);
Route::get('storage/userFiles/{filePath}', [FilesController::class, 'showFullSize'])->where('filePath', '.*');