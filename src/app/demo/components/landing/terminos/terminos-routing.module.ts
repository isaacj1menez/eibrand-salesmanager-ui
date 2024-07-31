import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TerminosComponent } from './terminos.component';



@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: TerminosComponent }
  ])],
  exports: [RouterModule]
})
export class TerminosRoutingModule { }
