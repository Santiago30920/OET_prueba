<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Propietario extends Model
{
    use HasFactory;
    protected $fillable = ['numeroCedula', 'primerNombre','segundoNombre','apellidos', 'direccion', 'telefono', 'ciudad'];
}
