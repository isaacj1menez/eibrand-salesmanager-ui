import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewSaleComponent } from './view-sale.component';
import { ViewSaleRoutingModule } from './view-sale-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ViewSaleRoutingModule
  ],
  declarations: [ViewSaleComponent],
})
export class ViewSalesModule { }
