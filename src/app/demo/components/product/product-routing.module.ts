import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { authenticationGuard } from 'src/app/guards/auth.guard';

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'categoria', data: { breadcrumb: 'Categoría' }, loadChildren: () => import('./category/category.module').then(m => m.CategoryModule), canActivate: [authenticationGuard] },
    { path: 'subcategoria', data: { breadcrumb: 'Sub Categoría' }, loadChildren: () => import('./sub-category/sub-category.module').then(m => m.SubCategoryModule), canActivate: [authenticationGuard] },
    { path: 'lista', data: { breadcrumb: 'Lista' }, loadChildren: () => import('./list-product/list-product.module').then(m => m.ListProductModule), canActivate: [authenticationGuard] },
    { path: 'nuevo', data: { breadcrumb: 'Agregar' }, loadChildren: () => import('./add-product/add-product.module').then(m => m.AddProductModule), canActivate: [authenticationGuard] },
    { path: 'inventario', data: { breadcrumb: 'Inventario' }, loadChildren: () => import('./inventory/inventory.module').then(m => m.InventoryModule), canActivate: [authenticationGuard] },
    { path: '**', redirectTo: '/notfound' }
  ])],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
