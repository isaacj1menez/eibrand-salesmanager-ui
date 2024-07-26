import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { authenticationGuard } from 'src/app/guards/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'nueva', data: { breadcrumb: 'Agregar' }, loadChildren: () => import('./add-sale/add-sale.module').then(m => m.AddSaleRoutingModule), canActivate: [authenticationGuard] },
      { path: 'transacciones', data: { breadcrumb: 'Transacciones' }, loadChildren: () => import('./transactions/transactions.module').then(m => m.TransactionsModule), canActivate: [authenticationGuard] },
      { path: 'ordenes', data: { breadcrumb: 'Ordenes' }, loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule), canActivate: [authenticationGuard] },
      { path: 'orden/:id', data: { breadcrumb: 'Orden' }, loadChildren: () => import('./view-sale/view-sale.module').then(m => m.ViewSalesModule), canActivate: [authenticationGuard] },
      { path: 'editar/:id', data: { breadcrumb: 'Editar' }, loadChildren: () => import('./edit-sale/edit-sale.module').then(m => m.EditSaleModule), canActivate: [authenticationGuard] },
      { path: '**', redirectTo: '/notfound' },
    ])
  ],
  exports: [RouterModule]
})
export class SaleRoutingModule { }
