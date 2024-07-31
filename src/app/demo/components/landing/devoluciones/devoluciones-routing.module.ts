import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DevolucionesComponent } from './devoluciones.component';



@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: DevolucionesComponent }
  ])],
  exports: [RouterModule]
})
export class DevolucionesRoutingModule { }
