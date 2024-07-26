import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'agregar', data: { breadcrumb: 'Agregar' }, loadChildren: () => import('./add-vendor/add-vendor.module').then(m => m.AddVendorModule) },
      { path: 'lista', data: { breadcrumb: 'Lista' }, loadChildren: () => import('./vendor-list/vendor-list.module').then(m => m.VendorListModule) },
      { path: '**', redirectTo: '/notfound' },
    ])
  ],
  exports: [RouterModule]
})
export class VendorRoutingModule { }
