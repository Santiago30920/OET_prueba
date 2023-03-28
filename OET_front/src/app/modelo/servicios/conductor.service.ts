import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Conductor } from '../clases/conductor';
import { EConductor } from '../enums/econductor';
import { Interface } from './interface';

@Injectable({
  providedIn: 'root'
})
export class ConductorService implements Interface {

  constructor(private http: HttpClient) { }
  persistir(conductor: Conductor) {
    return this.http.post<Conductor>(
     EConductor.CONDUCTOR_PERSISTIR, conductor)
      .pipe(catchError(this.handleError));
  }
  editar(conductor: Conductor) {
    return this.http.patch<Conductor>(
      EConductor.CONDUCTOR_EDITAR+"/"+conductor.id, conductor)
       .pipe(catchError(this.handleError));
  }
  listar() {
    return this.http.get<Conductor>(
      EConductor.CONDUCTOR_LISTAR)
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
