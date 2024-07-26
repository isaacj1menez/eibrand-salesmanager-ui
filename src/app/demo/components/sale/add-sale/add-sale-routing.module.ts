import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddSaleComponent } from './add-sale.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: AddSaleComponent }
    ])
  ],
  exports: [RouterModule]
})
export class AddSaleModule { }
