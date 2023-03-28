import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Propietario } from 'src/app/modelo/clases/propietario';
import { EOperacion } from 'src/app/modelo/enums/eoperacion';
import { Epropietario } from 'src/app/modelo/enums/epropietario';
import { PropietarioService } from 'src/app/modelo/servicios/propietario.service';
import { AddPropietarioComponent } from './add-propietario/add-propietario.component';

@Component({
  selector: 'app-propietario',
  templateUrl: './propietario.component.html',
  styleUrls: ['./propietario.component.css']
})
export class PropietarioComponent implements OnInit {

  //listarPropietarios
  propietarios: Propietario[] = [];

  displayedColumns: string[] = [Epropietario.LABEL_PRIMER_NOMBRE, Epropietario.LABEL_APELLIDOS, Epropietario.LABEL_NUMERO_CEDULA, Epropietario.LBEL_ACCION];
  dataSource!: MatTableDataSource<Propietario>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private propietarioService: PropietarioService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.propietarioService.listar().subscribe((data: any) => {
      if (data.status === EOperacion.OK) {
        this.propietarios = data.data;
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
    this.dataSource = new MatTableDataSource(this.propietarios);
    this.dataSource.filterPredicate = (data: Propietario, filter: string) => {
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
    const proper = new Propietario();
    proper.operacion = EOperacion.PERSISTIR;
    const ref = this.dialog.open(AddPropietarioComponent, {
      data: proper
    });
    ref.afterClosed().subscribe((propietario: Propietario) => {
      if (propietario) {
        this.propietarios.push(propietario);
        this.cargarData();
      }
    });
  }
  /**
   * Función que me permite editar a los propietarios
   * @param propietario 
   */
  editarPropietario(propietario: Propietario) {
    propietario.operacion = EOperacion.EDITAR;
    let prop = new Propietario();
    prop = prop.deepCopy(propietario) as Propietario;
    const ref = this.dialog.open(AddPropietarioComponent, {
      data: propietario,
      disableClose: true
    });
    ref.afterClosed().subscribe((propietario: Propietario) => {
      if (propietario) {
        for (let index = 0; index < this.propietarios.length; index++) {
          const serv = this.propietarios[index];
          if (serv.id === propietario.id) {
            this.propietarios.splice(index, 1, propietario);
            break;
          }
        }
        this.cargarData();
      }
    });
  }
}
