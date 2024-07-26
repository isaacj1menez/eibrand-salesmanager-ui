import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddVendorComponent } from './add-vendor.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: AddVendorComponent}
    ])
  ],
  exports: [RouterModule],
})
export class AddVendorRoutingModule { }
