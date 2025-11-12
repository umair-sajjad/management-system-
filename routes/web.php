<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\FacultyController;
use App\Http\Controllers\ClubAdminController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Auth/Login');
});

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Admin Routes
Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');
    Route::get('/students', [AdminController::class, 'manageStudents'])->name('students');
    Route::get('/roles', [AdminController::class, 'manageRoles'])->name('roles');
    Route::post('/users', [AdminController::class, 'storeUser'])->name('users.store');
    Route::patch('/users/{user}', [AdminController::class, 'updateUser'])->name('users.update');
    Route::delete('/users/{user}', [AdminController::class, 'destroyUser'])->name('users.destroy');
    Route::get('/events', [AdminController::class, 'manageEvents'])->name('events');
    Route::get('/discussions', [AdminController::class, 'discussions'])->name('discussions');
    Route::get('/feedbacks', [AdminController::class, 'feedbacks'])->name('feedbacks');
    Route::get('/share-resource', [AdminController::class, 'shareResource'])->name('share-resource');
});

// Student Routes
Route::middleware(['auth', 'role:student'])->prefix('student')->name('student.')->group(function () {
    Route::get('/dashboard', [StudentController::class, 'dashboard'])->name('dashboard');
    Route::get('/events', [StudentController::class, 'events'])->name('events');
    Route::get('/discussions', [StudentController::class, 'discussions'])->name('discussions');
    Route::get('/downloads', [StudentController::class, 'downloads'])->name('downloads');
    Route::get('/feed', [StudentController::class, 'feed'])->name('feed');
});

// Faculty Routes
Route::middleware(['auth', 'role:faculty'])->prefix('faculty')->name('faculty.')->group(function () {
    Route::get('/dashboard', [FacultyController::class, 'dashboard'])->name('dashboard');
    Route::get('/events', [FacultyController::class, 'manageEvents'])->name('events');
    Route::get('/feed', [FacultyController::class, 'manageFeed'])->name('feed');
    Route::get('/discussions', [FacultyController::class, 'discussions'])->name('discussions');
    Route::get('/share-resource', [FacultyController::class, 'shareResource'])->name('share-resource');
});

// Club Admin Routes
Route::middleware(['auth', 'role:club_admin'])->prefix('club-admin')->name('club-admin.')->group(function () {
    Route::get('/dashboard', [ClubAdminController::class, 'dashboard'])->name('dashboard');
    Route::get('/students', [ClubAdminController::class, 'manageStudents'])->name('students');
    Route::get('/events', [ClubAdminController::class, 'manageEvents'])->name('events');
    Route::get('/discussions', [ClubAdminController::class, 'discussions'])->name('discussions');
    Route::get('/feedbacks', [ClubAdminController::class, 'feedbacks'])->name('feedbacks');
    Route::get('/share-resource', [ClubAdminController::class, 'shareResource'])->name('share-resource');
});

require __DIR__ . '/auth.php';
