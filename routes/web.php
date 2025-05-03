<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\TodoController;
use Illuminate\Support\Facades\Route;

// Public route: login page and login form submission
Route::get('/login', [LoginController::class, 'show'])->name('login');
Route::post('/login', [LoginController::class, 'login']);

// Routes that require authentication
Route::middleware('auth')->group(function () {
    // Redirect the root path to the dashboard
    Route::get('/', function () {
        return redirect('/dashboard');
    });

    // Dashboard view
    Route::get('/dashboard', function () {
        return view('dashboard');
    });

    // Profile view
    Route::get('/dashboard/profile', function () {
        return view('profile');
    });

    // Logout route
    Route::post('/logout', [LoginController::class, 'logout'])->name('logout');

    // Todo resource routes (CRUD operations)
    Route::resource('todos', TodoController::class);
});
