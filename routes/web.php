<?php

use App\Http\Controllers\FilesController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::resource('/', HomeController::class, [
    'names' => [
        'index' => 'home.index'
    ]
]);
Route::get('/login', function() {
    return Response('status');
})->name('login');


Route::prefix('api')->middleware('auth')->group(function () {
    Route::resource('files', FilesController::class);
});

// require __DIR__.'/auth.php';
