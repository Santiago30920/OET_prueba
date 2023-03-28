import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PortalComponent } from './portal/portal.component';
import { PropietarioComponent } from './portal/propietario/propietario.component';
import { AddPropietarioComponent } from './portal/propietario/add-propietario/add-propietario.component';
import { VehiculoComponent } from './portal/vehiculo/vehiculo.component';
import { AddVehiculoComponent } from './portal/vehiculo/add-vehiculo/add-vehiculo.component';
import { ConductorComponent } from './portal/conductor/conductor.component';
import { AddConductorComponent } from './portal/conductor/add-conductor/add-conductor.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    PortalComponent,
    PropietarioComponent,
    AddPropietarioComponent,
    VehiculoComponent,
    AddVehiculoComponent,
    ConductorComponent,
    AddConductorComponent,
  ],
  imports: [
    MatSelectModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
