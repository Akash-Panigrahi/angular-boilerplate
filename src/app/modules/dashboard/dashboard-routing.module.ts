import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { SummaryPageComponent } from './pages/summary-page/summary-page.component';
import { DetailsPageComponent } from './pages/details-page/details-page.component';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
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
