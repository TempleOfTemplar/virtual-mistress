<?php

use App\Http\Controllers\SocialController;
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

Route::controller(SocialController::class)->group(function () {
    Route::get('vk/auth/callback', 'loginWithVkontakte');
    Route::get('vk/auth', 'vkontakteRedirect')->name('auth.vk');

    Route::get('google/auth/callback', 'loginWithGoogle');
    Route::get('google/auth', 'googleRedirect')->name('auth.google');
});

//Route::get('/{any}', function () {
//    return view('app');
//})->where('any', '^(?!api).*$');
