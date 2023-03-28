import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Propietario } from 'src/app/modelo/clases/propietario';
import { EOperacion } from 'src/app/modelo/enums/eoperacion';
import { PropietarioService } from 'src/app/modelo/servicios/propietario.service';

@Component({
  selector: 'app-add-propietario',
  templateUrl: './add-propietario.component.html',
  styleUrls: ['./add-propietario.component.css']
})
export class AddPropietarioComponent implements OnInit {
  /**
   * Indica si los campos se pueden editar
   */
  disable = false;
  propietario: Propietario;
  constructor(private dialogRef: MatDialogRef<AddPropietarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Propietario, private propietarioService: PropietarioService) {
    this.propietario = data;
    //Determinando si es editar o persitir
    if (this.propietario.operacion === EOperacion.EDITAR) {
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
    switch (this.propietario.operacion) {
      case EOperacion.PERSISTIR:
        if (this.propietario.primerNombre && this.propietario.segundoNombre && this.propietario.apellidos && this.propietario.numeroCedula &&
          this.propietario.direccion && this.propietario.ciudad) {
          this.propietarioService.persistir(this.propietario).subscribe((data: any) => {
            if (data.status === EOperacion.OK) {
              this.dialogRef.close(this.propietario);
            }
          }, (err: any) => {
            console.log(err);
          });
        }
        break;
      case EOperacion.EDITAR:
        if (this.propietario.primerNombre && this.propietario.segundoNombre && this.propietario.apellidos && this.propietario.numeroCedula &&
          this.propietario.direccion && this.propietario.ciudad) {
          this.propietarioService.editar(this.propietario).subscribe((data: any) => {
            if (data.status === EOperacion.OK) {
              this.dialogRef.close(this.propietario);
            }
          }, (err: any) => {
            console.log(err);
          });
        }
        break;
    }
  }
}
