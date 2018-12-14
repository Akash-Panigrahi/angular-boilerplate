import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
    {
        path: 'login',
        loadChildren: '../modules/authentication/authentication.module#AuthenticationModule'
    },
    {
        path: 'home',
        loadChildren: '../modules/dashboard/dashboard.module#DashboardModule'
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: '**',
        component: PageNotFoundComponent,
        data: { state: 'page-not-found' }
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class CoreRoutingModule { }
