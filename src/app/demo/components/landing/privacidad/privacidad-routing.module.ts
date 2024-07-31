import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrivacidadComponent } from './privacidad.component';



@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: PrivacidadComponent }
  ])],
  exports: [RouterModule]
})
export class PrivacidadRoutingModule { }
