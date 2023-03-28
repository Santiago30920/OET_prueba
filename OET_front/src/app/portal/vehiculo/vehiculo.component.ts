import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Vehiculo } from 'src/app/modelo/clases/vehiculo';
import { EOperacion } from 'src/app/modelo/enums/eoperacion';
import { Evehiculo } from 'src/app/modelo/enums/evehiculo';
import { VehiculoService } from 'src/app/modelo/servicios/vehiculo.service';
import { AddVehiculoComponent } from './add-vehiculo/add-vehiculo.component';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.css']
})
export class VehiculoComponent implements OnInit {


  //listarPropietarios
  vehiculos: Vehiculo[] = [];

  displayedColumns: string[] = [Evehiculo.LABEL_PLACA, Evehiculo.LABEL_MARCA, Evehiculo.LABEL_CONDUCTOR, Evehiculo.LABEL_PROPIETARIO, Evehiculo.LABEL_ACCION];
  dataSource!: MatTableDataSource<Vehiculo>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private vehiculoService: VehiculoService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.vehiculoService.listar().subscribe((data: any) => {
      if (data.status === EOperacion.OK) {
        this.vehiculos = data.data;
        this.cargarData();
      }
      console.log(this.vehiculos);
    }, (err: any) => {
      console.log(err);
    });

  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  cargarData() {
    this.dataSource = new MatTableDataSource(this.vehiculos);
    this.dataSource.filterPredicate = (data: Vehiculo, filter: string) => {
      if (data.placa) {
        const val = data.placa.toLowerCase().indexOf(filter.toLowerCase()) != -1;
        return val;
      } else {
        return false;
      }
    }
    this.dataSource.paginator = this.paginator;
  }
  /**
   * Función que me permite abrir el modal para registrar propietario
   */
  abrirModal() {
    const vehi = new Vehiculo();
    vehi.operacion = EOperacion.PERSISTIR;
    const ref = this.dialog.open(AddVehiculoComponent, {
      data: vehi
    });
    ref.afterClosed().subscribe((vehiculo: Vehiculo) => {
      if (vehiculo) {
        this.vehiculos.push(vehiculo);
        this.cargarData();
      }
    });
  }
  /**
   * Función que me permite editar a los vehiculos
   * @param vehiculo 
   */
  editarVehiculo(vehiculo: Vehiculo) {
    vehiculo.operacion = EOperacion.EDITAR;
    let prop = new Vehiculo();
    prop = prop.deepCopy(vehiculo) as Vehiculo;
    const ref = this.dialog.open(AddVehiculoComponent, {
      data: vehiculo,
      disableClose: true
    });
    ref.afterClosed().subscribe((vehiculo: Vehiculo) => {
      if (vehiculo) {
        for (let index = 0; index < this.vehiculos.length; index++) {
          const serv = this.vehiculos[index];
          if (serv.id === vehiculo.id) {
            this.vehiculos.splice(index, 1, vehiculo);
            break;
          }
        }
        this.cargarData();
      }
    });
  }
}
