import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Vehiculo } from '../clases/vehiculo';
import { Evehiculo } from '../enums/evehiculo';
import { Interface } from './interface';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService implements Interface {

  constructor(private http: HttpClient) { }
  persistir(vehiculo: Vehiculo) {
    delete vehiculo.operacion;
    return this.http.post<Vehiculo>(
      Evehiculo.VEHICULO_PERSISTIR, vehiculo)
      .pipe(catchError(this.handleError));
  }
  editar(vehiculo: Vehiculo) {
    delete vehiculo.operacion;
    return this.http.patch<Vehiculo>(
      Evehiculo.VEHICULO_EDITAR + "/" + vehiculo.placa, vehiculo)
      .pipe(catchError(this.handleError));
  }
  listar() {
    return this.http.get<Vehiculo>(
      Evehiculo.VEHICULO_LISTAR)
      .pipe(catchError(this.handleError));
  }
  /**
* Operación para manejar los errores
* @param error identificado a gestionar
* @returns 
*/
  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `${error.error.message}`;
    }
    return throwError(errorMessage);
  }
}
