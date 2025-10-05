<?php

use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DistrictController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DopeController;
use App\Http\Controllers\GpcrController;
use App\Http\Controllers\AntigenController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\ReferenceController;
use App\Http\Controllers\ResultController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SampleCollectionController;
use App\Http\Controllers\SampleController;
use App\Http\Controllers\MolecularResultController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MolecularRegController;
use App\Http\Controllers\MolecularRegTestController;
use App\Http\Controllers\RosterController;
use App\Models\Thana;
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

//Frontend Route

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::post('/dope/search', [HomeController::class, 'index'])->name('dope.search');

Route::get('contacts/create', [ContactController::class, 'create'])->name('contacts.create');
Route::resource('contacts', ContactController::class)->middleware(['auth', 'verified'])->except('create');

//Super admin route
Route::middleware(['auth', 'check_user_status', 'check_roles:super-admin'])->group(function () {

    Route::resource('roles', RoleController::class);
    Route::resource('permissions', PermissionController::class);
    Route::put('/users/{id}/toggle-active', [UserController::class, 'toggleActiveInactiveUser'])->name('users.toggleActive');

    Route::resource('references', ReferenceController::class);
    Route::resource('district', DistrictController::class);
    Route::resource('thana', DistrictController::class);
    Route::get('/district', [DistrictController::class, 'index']);
    Route::get('/thana/{districtId}', [Thana::class, 'getByDistrict']);
});

//Admin route
Route::middleware(['auth', 'check_user_status', 'check_roles:super-admin, admin'])->group(function () {

    Route::resource('users', UserController::class);
    Route::get('registers', [RegisteredUserController::class, 'index'])->middleware(['auth', 'verified'])->name('registers');

    Route::get('register', [RegisteredUserController::class, 'create'])->middleware(['auth', 'verified'])->name('register');

    Route::post('register', [RegisteredUserController::class, 'store'])->middleware(['auth', 'verified']);

    Route::get('/results/fetch/{patient_id}', [ResultController::class, 'fetchByPatientId'])->name('result.fetch');
    Route::patch('/resultUpdate/{result}', [ResultController::class, 'updateData'])->name('result.updateData');
    Route::get('dope-report/{id}', [ResultController::class, 'dopeReport'])->name('dope-report');
    Route::get('update-report', [ResultController::class, 'updateReport'])->name('update-report');
    Route::put('/update-status', [ResultController::class, 'updateStatus'])->name('update-status');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

//Sub Admin route
Route::middleware(['auth', 'check_user_status', 'check_roles:super-admin, admin, sub-admin'])->group(function () {});

//User route
Route::middleware(['auth', 'check_user_status', 'check_roles:super-admin, admin, sub-admin, user'])->group(function () {

    Route::resource('moleculars', MolecularRegController::class);
    Route::resource('pcr', GpcrController::class);
    Route::get('invoice/{id}', [GpcrController::class, 'moneyReceipt'])->name('invoice');
    // Route::get('summary', [GpcrController::class, 'summaryReport'])->name('summary');
    Route::get('pcr/summary/report', [GpcrController::class, 'dateWiseBalSummary'])->name('pcr.summary');
    Route::get('pcr/summary/details', [GpcrController::class, 'summaryDetails'])->name('pcr.summary.details');
    Route::get('pcr/dues/details', [GpcrController::class, 'duesCheck'])->name('pcr.dues.details');

    Route::resource('antigen', AntigenController::class);
    Route::get('antigen/summary/report', [AntigenController::class, 'dateWiseBalSummary'])->name('antigen.summary');
    Route::get('antigen/summary/details', [AntigenController::class, 'summaryDetails'])->name('antigen.summary.details');
    Route::get('antigen/dues/details', [AntigenController::class, 'duesCheck'])->name('antigen.dues.details');
    Route::get('antigen/invoice/{id}', [AntigenController::class, 'antigenMoneyReceipt'])->name('antigen.invoice');

    Route::resource('dope', DopeController::class);
    Route::get('dope-inv/{id}', [DopeController::class, 'moneyReceipt'])->name('dope-inv');
    Route::get('dope-summary', [DopeController::class, 'summaryReport'])->name('dope-summary');
    Route::get('summary-details', [DopeController::class, 'summaryDetails'])->name('summary-details');
    Route::get('dues-details', [DopeController::class, 'duesCheck'])->name('dues-details');
    Route::resource('sample', SampleCollectionController::class);
    Route::get('barcode/{id}', [SampleCollectionController::class, 'barcodeGenerate'])->name('barcode');
    Route::resource('result', ResultController::class);
});

//General route
Route::middleware(['auth', 'check_roles:super-admin, admin, sub-admin, user, general'])->group(function () {

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('molecular-inv/{patient_id}', [MolecularRegTestController::class, 'molecularMoneyReceipt'])->name('molecular-inv');
    Route::get('molecular/summary', [MolecularRegController::class, 'summaryReport'])->name('molecular.summary');
    Route::get('molecular/summary/details', [MolecularRegController::class, 'summaryDetails'])->name('molecular.summary.details');
    Route::get('molecular/dues/details', [MolecularRegController::class, 'duesCheck'])->name('molecular.dues.details');

    Route::resource('samples', SampleController::class);
    Route::get('samples-receive', [SampleController::class, 'sampleReceiveCreate'])->name('samples-receive');
    Route::put('/samples/receive/{id}', [SampleController::class, 'sampleReceiveUpdate'])->name('samples.receive.update');

    Route::resource('/results', MolecularResultController::class);

    Route::get('/results/{patient_id}/createReport', [MolecularResultController::class, 'molecularResultCreate'])->name('results.createReport');

    Route::get('/results/{patientId}/reports', [MolecularResultController::class, 'generateReport'])->name('results.reports');
    Route::get('/results/{patientId}/report-sign', [MolecularResultController::class, 'generateReportWithSign'])->name('results.sign');
});

Route::get('/attendance/sync/create', [AttendanceController::class, 'syncCreate']);
Route::get('/attendance/sync', [AttendanceController::class, 'sync']);
Route::get('/attendance/report', [AttendanceController::class, 'report'])->name('attendance.report');
Route::resource('/attendance', AttendanceController::class);
Route::resource('employees', EmployeeController::class);
Route::resource('rosters', RosterController::class);

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

require __DIR__ . '/auth.php';
