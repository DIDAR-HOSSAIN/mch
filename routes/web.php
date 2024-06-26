<?php

use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\DistrictController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DopeController;
use App\Http\Controllers\GpcrController;
use App\Http\Controllers\ResultController;
use App\Http\Controllers\SampleCollectionController;
use App\Models\Thana;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

// Route::inertia('/', 'Home')->name('home');

Route::get('registers', [RegisteredUserController::class, 'index'])->middleware(['auth', 'verified'])->name('registers');

Route::get('register', [RegisteredUserController::class, 'create'])->middleware(['auth', 'verified'])->name('register');

Route::post('register', [RegisteredUserController::class, 'store'])->middleware(['auth', 'verified']);

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Route::inertia('/whoweare', 'WhoWeAre')->name('whoweare');

// Route::inertia('/about', 'About')->name('about');

// Route::get('contacts/create', [ContactController::class, 'create'])->name('contacts.create');
// Route::resource('contacts', ContactController::class)->middleware(['auth', 'verified'])->except('create');

Route::middleware(['auth'])->group(function(){

    // General pcr route
    Route::resource('pcr', GpcrController::class);
    Route::get('invoice/{id}', [GpcrController::class, 'moneyReceipt'])->name('invoice');
    Route::get('summary', [GpcrController::class, 'summaryReport'])->name('summary');

    // Dope route
    Route::resource('dope', DopeController::class);
    Route::get('dope-inv/{id}', [DopeController::class, 'moneyReceipt'])->name('dope-inv');
    Route::get('dope-summary', [DopeController::class, 'summaryReport'])->name('dope-summary');
    Route::get('summary-details', [DopeController::class, 'summaryDetails'])->name('summary-details');
    Route::get('dues-details', [DopeController::class, 'duesCheck'])->name('dues-details');
    Route::resource('sample', SampleCollectionController::class);
    Route::get('barcode/{id}', [SampleCollectionController::class, 'barcodeGenerate'])->name('barcode');
    Route::resource('result', ResultController::class);
    Route::get('dope-report/{id}', [ResultController::class, 'dopeReport'])->name('dope-report');
    Route::get('update-report', [ResultController::class, 'updateReport'])->name('update-report');
    Route::put('/update-status', [ResultController::class, 'updateStatus'])->name('update-status');
    Route::resource('district', DistrictController::class);
    Route::resource('thana', DistrictController::class);
    Route::get('/district', [DistrictController::class, 'index']);
    Route::get('/thana/{districtId}', [Thana::class, 'getByDistrict']);


});








// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/users', function () {
    return Inertia::render('Users/User');
});

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
