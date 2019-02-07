import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';

import { NgbCollapseModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartModule } from 'angular-highcharts';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReportingModule } from '../reporting/reporting.module';

import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { DetailsPageComponent } from './pages/details-page/details-page.component';
import { SummaryPageComponent } from './pages/summary-page/summary-page.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ActionBarComponent } from './components/action-bar/action-bar.component';
import { BasicColumnComponent } from './components/basic-column/basic-column.component';
import { GradientPieComponent } from './components/gradient-pie/gradient-pie.component';
import { NgProgressModule } from '@ngx-progressbar/core';

@NgModule({
    declarations: [
        DashboardPageComponent,
        DetailsPageComponent,
        SummaryPageComponent,
        HeaderComponent,
        FooterComponent,
        ActionBarComponent,
        BasicColumnComponent,
        GradientPieComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,

        NgbCollapseModule.forRoot(),
        ChartModule,
        NgProgressModule,
        NgbDatepickerModule.forRoot(),

        SharedModule,
        DashboardRoutingModule,
        ReportingModule,
    ]
})
export class DashboardModule {
    constructor() {
        if (!environment.production) {
            console.log('DashboardModule loaded');
        }
    }
}
