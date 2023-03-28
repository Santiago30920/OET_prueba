<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Propietarios;
use Exception;

class PropietarioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $propietarios = Propietarios::all();
        return response()->json([
            "status" => 200,
            "message" => "user-get succesfully",
            "data" => $propietarios
        ],200);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try{

            $propietario = new Propietarios();
            $propietario->numeroCedula = $request->numeroCedula;
            $propietario->primerNombre = $request->primerNombre;
            $propietario->segundoNombre = $request->segundoNombre;
            $propietario->apellidos = $request->apellidos;
            $propietario->direccion = $request->direccion;
            $propietario->telefono = $request->telefono;
            $propietario->ciudad = $request->ciudad;
    
            $propietario->save();
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

            $response = Propietarios::where('numeroCedula', '=',$request->numeroCedula)->update([
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
