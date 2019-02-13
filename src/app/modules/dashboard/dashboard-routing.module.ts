import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { SummaryPageComponent } from './pages/summary-page/summary-page.component';
import { DetailsPageComponent } from './pages/details-page/details-page.component';

const routes: Routes = [
    {
        path: '',
        component: DashboardPageComponent,
        children: [
            {
                path: '',
                redirectTo: 'summary',
                pathMatch: 'full'
            },
            {
                path: 'summary',
                component: SummaryPageComponent,
                data: { title: 'Summary' }
            },
            {
                path: 'details',
                component: DetailsPageComponent,
                data: { title: 'Details' }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
