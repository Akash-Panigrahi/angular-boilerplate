import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';

import { NgbCollapseModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartModule } from 'angular-highcharts';
import { OwlDateTimeModule } from 'ng-pick-datetime';
import { OwlMomentDateTimeModule } from 'ng-pick-datetime-moment';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DetailsGridModule } from '../details-grid/details-grid.module';

import { DashboardComponent } from './dashboard.component';
import { DetailsPageComponent } from './pages/details-page/details-page.component';
import { SummaryPageComponent } from './pages/summary-page/summary-page.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ActionBarComponent } from './components/action-bar/action-bar.component';
import { BasicColumnComponent } from './components/basic-column/basic-column.component';
import { GradientPieComponent } from './components/gradient-pie/gradient-pie.component';
import { NgProgressModule } from '@ngx-progressbar/core';
import { KpiComponent } from './components/kpi/kpi.component';
import { CopyrightPipe } from './pipes/copyright/copyright.pipe';

import { DateTimeRangeService } from './services/date-time-range/date-time-range.service';
import { FormatTimeService } from './services/format-time/format-time.service';
import { LogoutService } from './services/logout/logout.service';
import { DetailsGridRequestService } from './services/details-grid-request/details-grid-request.service';
import { SidenavOverlayComponent } from './components/sidenav-overlay/sidenav-overlay.component';
import { SidenavOverlayService } from './services/sidenav-overlay/sidenav-overlay.service';
import { DatetimerangeComponent } from './components/datetimerange/datetimerange.component';
import { DatetimerangeOverlayService } from './services/datetimerange-overlay/datetimerange-overlay.service';

@NgModule({
    declarations: [
        DashboardComponent,
        DetailsPageComponent,
        SummaryPageComponent,
        HeaderComponent,
        FooterComponent,
        ActionBarComponent,
        BasicColumnComponent,
        GradientPieComponent,
        KpiComponent,
        CopyrightPipe,
        SidenavOverlayComponent,
        DatetimerangeComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,

        NgbCollapseModule,
        ChartModule,
        NgProgressModule,
        NgbDatepickerModule,
        OwlDateTimeModule,
        OwlMomentDateTimeModule,

        SharedModule,
        DashboardRoutingModule,
        DetailsGridModule,
    ],
    providers: [
        DateTimeRangeService,
        DetailsGridRequestService,
        FormatTimeService,
        LogoutService,
        SidenavOverlayService,
        DatetimerangeOverlayService
    ],
    entryComponents: [
        /**
         * Needs to be added here because otherwise we can't
         * dynamically render this component at runtime
         */
        SidenavOverlayComponent,
        DatetimerangeComponent
    ]
})
export class DashboardModule {
    constructor() {
        if (!environment.production) {
            console.log('DashboardModule loaded');
        }
    }
}
