import { Component, OnInit } from '@angular/core';
import { EOperación } from 'src/app/modelo/enums/eoperación';
import { ConductorService } from 'src/app/modelo/servicios/conductor.service';

@Component({
  selector: 'app-conductor',
  templateUrl: './conductor.component.html',
  styleUrls: ['./conductor.component.css']
})
export class ConductorComponent implements OnInit {

  constructor(private conductorService: ConductorService) { }

  ngOnInit(): void {
    this.conductorService.listar().subscribe((data: any) => {
      if (data.code === EOperación.OK) {
        console.log(data);
      }
    },(err: any) => {
      console.log(err);
    });
  }

}
