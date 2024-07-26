import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { authenticationGuard } from './guards/auth.guard';
import { LandingComponent } from './demo/components/landing/landing.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: '', component: LandingComponent },
            {
                path: 'management', component: AppLayoutComponent,
                children: [
                    { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [authenticationGuard] },
                    { path: 'productos', loadChildren: () => import('./demo/components/product/product.module').then(m => m.ProductModule), canActivate: [authenticationGuard] },
                    { path: 'ventas', loadChildren: () => import('./demo/components/sale/sale.module').then(m => m.SaleModule), canActivate: [authenticationGuard] },
                    { path: 'colaboradores', loadChildren: () => import('./demo/components/vendor/vendor.module').then(m => m.VendorModule), canActivate: [authenticationGuard] },
                ]
            },
            { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'client', loadChildren: () => import('./demo/components/client/client.module').then(m => m.ClientModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
