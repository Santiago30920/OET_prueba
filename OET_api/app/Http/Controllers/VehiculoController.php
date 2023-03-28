<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Vehiculo;
use Exception;

class VehiculoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $vehiculos = Vehiculo::all();
        return response()->json([
            "status" => 200,
            "message" => "user-get succesfully",
            "data" => $vehiculos
        ],200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try{
            $veiculo = new Vehiculo();
            $veiculo->placa = $request->placa;
            $veiculo->color = $request->color;
            $veiculo->marca = $request->marca;
            $veiculo->tipo = $request->tipo;
            $veiculo->conductor = $request->conductor;
            $veiculo->propietario = $request->propietario;

            $veiculo->save();
            return response()->json([
                "status" => 200,
                "message" => "Se almaceno correctamente", 
                "code" => 1
            ],200);
        }catch(Exception $e){
            return response()->json([
                "status" => 500,
                "message" => "Ha ocurrido un error",
                "messageLog" => $e->getMessage(),
            ],500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try{
            $response = Vehiculo::where('id', '=',$request->id)->update([
               'placa'=> $request->placa,
               'color' => $request->color,
               'arca' => $request->marca,
               'tipo' => $request->tipo,
               'conductor' => $request->conductor,
               'propietario' => $request->propietario,
            ]);
            if($response === 1){
                return response()->json([
                    "status" => 200,
                    "message" => "Se actualizo correctamente", 
                    "code" => 1
                ],200);
            }
        }catch(Exception $e){
            return response()->json([
                "status" => 500,
                "message" => "Ha ocurrido un error",
                "messageLog" => $e->getMessage(),
            ],500);
        }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
