import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddVendorComponent } from './add-vendor.component';
import { AddVendorRoutingModule } from './add-vendor-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AddVendorRoutingModule
  ],
  declarations: [AddVendorComponent],
})
export class AddVendorModule { }
