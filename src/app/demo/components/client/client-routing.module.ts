import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'orden/:id', loadChildren: () => import('./order-details/order-details.module').then(m => m.OrderDetailsModule) },
    { path: '**', redirectTo: '/notfound' }
  ])],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
