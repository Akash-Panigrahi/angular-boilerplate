import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { NotLoggedInUserGuard } from './core/guards/not-logged-in-user/not-logged-in-user.guard';

const routes: Routes = [
    {
        path: 'login',
        // loading authentication module only when required
        /*
            when specifiying lazy loaded module,
            supply module path and export class name after '#'
        */
        loadChildren: './views/authentication/authentication.module#AuthenticationModule',
        // route can only be activated if user is not logged in
        /*
            if canActivate returns false, then next in line route will be checked which is '', hence will go to DashboardModule routes
        */
        canActivate: [NotLoggedInUserGuard]
    },
    {
        path: '',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule',
        // route can only be activated by logged in user
        canActivate: [NotLoggedInUserGuard]
    },
    {
        path: '',
        // if nothing is specified redirect to login route
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: '**',
        // redirect to PageNotFoundComponent if no route matches
        component: PageNotFoundComponent,
        data: { title: 'Oops! Page Not Found' }
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            useHash: true // this will add '#' after base href, and app will be an SPA
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
