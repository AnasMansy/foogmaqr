<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EventController;
use App\Http\Controllers\VisitorController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\BuildingController;
use App\Http\Controllers\OfficeController;
use App\Http\Controllers\EmployeeController;

// Existing route for authenticated user
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Reports Route
Route::get('/reports/visitor-stats', [ReportController::class, 'getVisitorStats']);

// Event Manager
Route::apiResource('events', EventController::class);

 
Route::apiResource('visitors', VisitorController::class);


// Buildings Routes
Route::apiResource('buildings', BuildingController::class);

// Offices Routes
Route::apiResource('offices', OfficeController::class);

// Employees Routes
Route::apiResource('employees', EmployeeController::class);
