import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { DetailsPageComponent } from './pages/details-page/details-page.component';
import { SummaryPageComponent } from './pages/summary-page/summary-page.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgbCollapseModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { ActionBarComponent } from './components/action-bar/action-bar.component';
import { FormsModule } from '@angular/forms';
import { ReportDatatableComponent } from './pages/details-page/components/report-datatable/report-datatable.component';
import { ChartModule } from 'angular-highcharts';
import { BasicColumnComponent } from './pages/summary-page/components/basic-column/basic-column.component';
import { GradientPieComponent } from './pages/summary-page/components/gradient-pie/gradient-pie.component';

@NgModule({
    declarations: [
        HomePageComponent,
        DetailsPageComponent,
        SummaryPageComponent,
        HeaderComponent,
        FooterComponent,
        ActionBarComponent,
        ReportDatatableComponent,
        BasicColumnComponent,
        GradientPieComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        DashboardRoutingModule,
        NgbCollapseModule.forRoot(),
        NgbDatepickerModule.forRoot(),
        FormsModule,
        ChartModule
    ]
})
export class DashboardModule {
    constructor() {
        console.log('DashboardModule loaded');
    }
}
