import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Conductor } from 'src/app/modelo/clases/conductor';
import { EConductor } from 'src/app/modelo/enums/econductor';
import { EOperacion } from 'src/app/modelo/enums/eoperacion';
import { ConductorService } from 'src/app/modelo/servicios/conductor.service';
import { AddConductorComponent } from './add-conductor/add-conductor.component';

@Component({
  selector: 'app-conductor',
  templateUrl: './conductor.component.html',
  styleUrls: ['./conductor.component.css']
})
export class ConductorComponent implements OnInit {


  //listarPropietarios
  conductores: Conductor[] = [];

  displayedColumns: string[] = [EConductor.LABEL_PRIMER_NOMBRE, EConductor.LABEL_APELLIDOS, EConductor.LABEL_NUMERO_CEDULA, EConductor.LABEL_ACCCION];
  dataSource!: MatTableDataSource<Conductor>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private conductorSevice: ConductorService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.conductorSevice.listar().subscribe((data: any) => {
      if (data.status === EOperacion.OK) {
        this.conductores = data.data;
        this.cargarData();
      }
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
    this.dataSource = new MatTableDataSource(this.conductores);
    this.dataSource.filterPredicate = (data: Conductor, filter: string) => {
      if (data.primerNombre) {
        const val = data.primerNombre.toLowerCase().indexOf(filter.toLowerCase()) != -1;
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
    const cond = new Conductor();
    cond.operacion = EOperacion.PERSISTIR;
    const ref = this.dialog.open(AddConductorComponent, {
      data: cond
    });
    ref.afterClosed().subscribe((conductor: Conductor) => {
      if (conductor) {
        this.conductores.push(conductor);
        this.cargarData();
      }
    });
  }
  /**
   * Función que me permite editar a los conductores
   * @param condcutor 
   */
  editarPropietario(conductor: Conductor) {
    conductor.operacion = EOperacion.EDITAR;
    let prop = new Conductor();
    prop = prop.deepCopy(conductor) as Conductor;
    const ref = this.dialog.open(AddConductorComponent, {
      data: conductor,
      disableClose: true
    });
    ref.afterClosed().subscribe((conductor: Conductor) => {
      if (conductor) {
        for (let index = 0; index < this.conductores.length; index++) {
          const serv = this.conductores[index];
          if (serv.id === conductor.id) {
            this.conductores.splice(index, 1, conductor);
            break;
          }
        }
        this.cargarData();
      }
    });
  }

}
