import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VendorListComponent } from './vendor-list.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: VendorListComponent}
    ])
  ],
  exports: [RouterModule],
})
export class VendorListRoutingModule { }
