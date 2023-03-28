<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Conductor;
use Exception;

class ConductorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $conductores = Conductor::all();
        return response()->json([
            "status" => 200,
            "message" => "user-get succesfully",
            "data" => $conductores
        ],200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try{
            $conductor = new Conductor();
            $conductor->numeroCedula = $request->numeroCedula;
            $conductor->primerNombre = $request->primerNombre;
            $conductor->segundoNombre = $request->segundoNombre;
            $conductor->apellidos = $request->apellidos;
            $conductor->direccion = $request->direccion;
            $conductor->telefono = $request->telefono;
            $conductor->ciudad = $request->ciudad;
    
            $conductor->save();
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

            $response = Conductor::where('id', '=',$request->id)->update([
               'numeroCedula' => $request->numeroCedula,
               'primerNombre' => $request->primerNombre,
               'segundoNombre' => $request->segundoNombre,
               'apellidos' => $request->apellidos,
               'direccion' => $request->direccion,
               'telefono' => $request->telefono,
               'ciudad' => $request->ciudad,
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
