import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EditSaleComponent } from './edit-sale.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      { path: '', component: EditSaleComponent}
    ])
  ],
  exports: [RouterModule]
})
export class EditSaleRouterModule { }
