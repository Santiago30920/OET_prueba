import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Conductor } from 'src/app/modelo/clases/conductor';
import { Propietario } from 'src/app/modelo/clases/propietario';
import { Vehiculo } from 'src/app/modelo/clases/vehiculo';
import { EOperacion } from 'src/app/modelo/enums/eoperacion';
import { ConductorService } from 'src/app/modelo/servicios/conductor.service';
import { PropietarioService } from 'src/app/modelo/servicios/propietario.service';
import { VehiculoService } from 'src/app/modelo/servicios/vehiculo.service';

@Component({
  selector: 'app-add-vehiculo',
  templateUrl: './add-vehiculo.component.html',
  styleUrls: ['./add-vehiculo.component.css']
})
export class AddVehiculoComponent implements OnInit {

  /**
   * Indica si los campos se pueden editar
   */
  disable = false;
  vehiculo: Vehiculo;
  propietarios: Propietario[] = [];
  conductores: Conductor[] = [];
  constructor(private dialogRef: MatDialogRef<AddVehiculoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Vehiculo, private vehiculoService: VehiculoService, private propietarioService: PropietarioService,
  private conductorSevice: ConductorService) {
    this.vehiculo = data;
    //Determinando si es editar o persitir
    if (this.vehiculo.operacion === EOperacion.EDITAR) {
      this.disable = true;
    } else {
      this.disable = false;
    }
  }

  ngOnInit(): void {
    this.propietarioService.listar().subscribe((data: any) => {
      if (data.status === EOperacion.OK) {
        this.propietarios = data.data;
      }
    }, (err: any) => {
      console.log(err);
    });
    this.conductorSevice.listar().subscribe((data: any) => {
      if (data.status === EOperacion.OK) {
        this.conductores = data.data;
      }
    }, (err: any) => {
      console.log(err);
    });
  }
  /**
   * Metodo que permite confirmar la acción del boton
   */
  confirmar() {
    switch (this.vehiculo.operacion) {
      case EOperacion.PERSISTIR:
        if (this.vehiculo.placa && this.vehiculo.color && this.vehiculo.marca && this.vehiculo.tipo &&
          this.vehiculo.conductor && this.vehiculo.propietario) {
          this.vehiculoService.persistir(this.vehiculo).subscribe((data: any) => {
            if (data.status === EOperacion.OK) {
              this.dialogRef.close(this.vehiculo);
            }
          }, (err: any) => {
            console.log(err);
          });
        }
        break;
      case EOperacion.EDITAR:
        if (this.vehiculo.placa && this.vehiculo.color && this.vehiculo.marca && this.vehiculo.tipo &&
          this.vehiculo.conductor && this.vehiculo.propietario) {
          this.vehiculoService.editar(this.vehiculo).subscribe((data: any) => {
            if (data.status === EOperacion.OK) {
              this.dialogRef.close(this.vehiculo);
            }
          }, (err: any) => {
            console.log(err);
          });
        }
        break;
    }
  }
}
