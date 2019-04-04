import { Component, HostBinding } from '@angular/core';
import { dashboardRoutingAnimation } from './dashboard-routing.animations';
import { dashboardAnimation } from './dashboard.animations';
import { OWL_DATE_TIME_FORMATS } from 'ng-pick-datetime';

export const MY_CUSTOM_DATETIME_FORMATS = {
    fullPickerInput: 'MMM DD, YYYY h:mm:ss A',
    monthYearLabel: 'MMM YYYY',
};

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [
        dashboardRoutingAnimation,
        dashboardAnimation
    ],
    providers: [
        {
            provide: OWL_DATE_TIME_FORMATS,
            useValue: MY_CUSTOM_DATETIME_FORMATS
        }
    ]
})
export class DashboardComponent {

    // bind dashboardAnimation animation on host
    @HostBinding('@dashboardAnimation')
    private _dashboardAnimation = true;
}
