import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ViewSaleComponent } from './view-sale.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: ViewSaleComponent }
    ])
  ],
  exports: [RouterModule]
})
export class ViewSaleRoutingModule { }
