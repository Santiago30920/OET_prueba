<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VehiculoController;
use App\Http\Controllers\ConductorController;
use App\Http\Controllers\PropietarioController;

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

Route::get('vehiculo/consultar', [VehiculoController::class, "index"]);
Route::post('vehiculo/crear', [VehiculoController::class, "store"]);
Route::patch('vehiculo/editar/{id}', [VehiculoController::class, "update"]);

Route::get('conducto/consultar', [ConductorController::class, "index"]);
Route::post('conducto/crear', [ConductorController::class, "store"]);
Route::patch('conducto/editar/{id}', [ConductorController::class, "update"]);

Route::get('propietario/consultar', [PropietarioController::class, "index"]);
Route::post('propietario/crear',  [PropietarioController::class, "store"]);
Route::patch('propietario/editar/{id}',  [PropietarioController::class, "update"]);
