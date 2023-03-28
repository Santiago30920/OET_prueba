import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Conductor } from 'src/app/modelo/clases/conductor';
import { EOperacion } from 'src/app/modelo/enums/eoperacion';
import { ConductorService } from 'src/app/modelo/servicios/conductor.service';

@Component({
  selector: 'app-add-conductor',
  templateUrl: './add-conductor.component.html',
  styleUrls: ['./add-conductor.component.css']
})
export class AddConductorComponent implements OnInit {

  /**
   * Indica si los campos se pueden editar
   */
  disable = false;
  conductor: Conductor;
  constructor(private dialogRef: MatDialogRef<AddConductorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Conductor, private conductorService: ConductorService) {
    this.conductor = data;
    //Determinando si es editar o persitir
    if (this.conductor.operacion === EOperacion.EDITAR) {
      this.disable = true;
    } else {
      this.disable = false;
    }
  }

  ngOnInit(): void {
  }
  /**
   * Metodo que permite confirmar la acción del boton
   */
  confirmar() {
    switch (this.conductor.operacion) {
      case EOperacion.PERSISTIR:
        if (this.conductor.primerNombre && this.conductor.segundoNombre && this.conductor.apellidos && this.conductor.numeroCedula &&
          this.conductor.direccion && this.conductor.ciudad) {
          this.conductorService.persistir(this.conductor).subscribe((data: any) => {
            if (data.status === EOperacion.OK) {
              this.dialogRef.close(this.conductor);
            }
          }, (err: any) => {
            console.log(err);
          });
        }
        break;
      case EOperacion.EDITAR:
        if (this.conductor.primerNombre && this.conductor.segundoNombre && this.conductor.apellidos && this.conductor.numeroCedula &&
          this.conductor.direccion && this.conductor.ciudad) {
          this.conductorService.editar(this.conductor).subscribe((data: any) => {
            if (data.status === EOperacion.OK) {
              this.dialogRef.close(this.conductor);
            }
          }, (err: any) => {
            console.log(err);
          });
        }
        break;
    }
  }

}
