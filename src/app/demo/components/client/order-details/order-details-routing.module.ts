import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrderDetailsComponent } from './order-details.component';

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: OrderDetailsComponent }
  ])],
  exports: [RouterModule]
})
export class OrderDetailsRoutingModule { }
