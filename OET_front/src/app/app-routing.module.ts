import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConductorComponent } from './portal/conductor/conductor.component';
import { PortalComponent } from './portal/portal.component';
import { PropietarioComponent } from './portal/propietario/propietario.component';
import { VehiculoComponent } from './portal/vehiculo/vehiculo.component';

const routes: Routes = [{
  path: '', component: PortalComponent,
  children: [
    { path: 'vehiculo', component: VehiculoComponent },
    { path: 'propietario', component: PropietarioComponent },
    { path: 'conductor', component: ConductorComponent },
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
