import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorListComponent } from './vendor-list.component';
import { VendorListRoutingModule } from './vendor-list-routing.module';

@NgModule({
  imports: [
    CommonModule,
    VendorListRoutingModule
  ],
  declarations: [VendorListComponent],
})
export class VendorListModule { }
