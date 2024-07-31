import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivacidadRoutingModule } from './privacidad-routing.module';
import { PrivacidadComponent } from './privacidad.component';



@NgModule({
  declarations: [PrivacidadComponent],
  imports: [
    CommonModule,
    PrivacidadRoutingModule
  ]
})
export class PrivacidadModule { }
