<?php

use App\Http\Controllers\web\KomikController;
use App\Http\Controllers\web\UrlIndukController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

Route::middleware(['auth'])->group(function () {
    Route::resource('komik', KomikController::class)
        ->only([
            'index',
            'store',
            'update',
            'destroy',
        ]);

    Route::post(
        '/komik/{komik}/url-induk',
        [UrlIndukController::class, 'store']
    )->name('komik.url-induk.store');

    Route::put(
        '/url-induk/{urlInduk}',
        [UrlIndukController::class, 'update']
    )->name('url-induk.update');

    Route::delete(
        '/url-induk/{urlInduk}',
        [UrlIndukController::class, 'destroy']
    )->name('url-induk.destroy');
});

require __DIR__ . '/settings.php';
