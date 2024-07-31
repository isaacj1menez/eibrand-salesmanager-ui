import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevolucionesRoutingModule } from './devoluciones-routing.module';
import { DevolucionesComponent } from './devoluciones.component';



@NgModule({
  declarations: [DevolucionesComponent],
  imports: [
    CommonModule,
    DevolucionesRoutingModule
  ]
})
export class DevolucionesModule { }
