<?php

use App\Http\Controllers\ZKTecoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Rats\Zkteco\Lib\ZKTeco;
use Illuminate\Support\Facades\Log;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/attendance/store', function (Request $request) {
    Log::info('Attendance Data Received', $request->all());

    // এখানে তুমি ডাটাবেজে সেভ করতে পারো
    foreach ($request->input('records', []) as $record) {
        \App\Models\Attendance::create([
            'user_id' => $record['id'],
            'timestamp' => $record['timestamp'],
            'type' => $record['type'],
        ]);
    }

    return response()->json(['success' => true, 'count' => count($request->input('records', []))]);
});

// routes/api.php
Route::post('/zkteco/sync', [ZKTecoController::class, 'store']);
