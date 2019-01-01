import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { OnlyLoggedInUserGuard } from './core/guards/only-logged-in-user/only-logged-in-user.guard';
import { AlreadyLoggedInUserGuard } from './core/guards/already-logged-in-user/already-logged-in-user.guard';

const routes: Routes = [
    {
        path: 'login',
        loadChildren: './modules/authentication/authentication.module#AuthenticationModule',
        canActivate: [AlreadyLoggedInUserGuard]
    },
    {
        path: 'home',
        loadChildren: './modules/dashboard/dashboard.module#DashboardModule',
        canActivate: [OnlyLoggedInUserGuard]
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
export class AppRoutingModule { }
