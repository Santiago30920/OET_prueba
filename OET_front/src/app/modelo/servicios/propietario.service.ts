import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Propietario } from '../clases/propietario';
import { Epropietario } from '../enums/epropietario';
import { Interface } from './interface';

@Injectable({
  providedIn: 'root'
})
export class PropietarioService implements Interface {

  constructor(private http: HttpClient) { }
  persistir(propietario: Propietario) {
    delete propietario.operacion;
    return this.http.post<Propietario>(
      Epropietario.PROPIETARIO_PERSISTIR, propietario)
      .pipe(catchError(this.handleError));
  }
  editar(propietario: Propietario) {
    delete propietario.operacion;
    return this.http.patch<Propietario>(
      Epropietario.PROPIETARIO_EDITAR + "/" + propietario.numeroCedula, propietario)
      .pipe(catchError(this.handleError));
  }
  listar() {
    return this.http.get<Propietario>(
      Epropietario.PROPIETARIO_LISTAR)
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
