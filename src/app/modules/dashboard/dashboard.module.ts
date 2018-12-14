import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { DetailsPageComponent } from './pages/details-page/details-page.component';
import { SummaryPageComponent } from './pages/summary-page/summary-page.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
        HomePageComponent,
        DetailsPageComponent,
        SummaryPageComponent,
        HeaderComponent,
        FooterComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        DashboardRoutingModule,
        NgbCollapseModule.forRoot()
    ]
})
export class DashboardModule {
    constructor() {
        console.log('DashboardModule loaded');
    }
}
