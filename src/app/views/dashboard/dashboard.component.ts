import { Component, HostBinding } from '@angular/core';
import { dashboardRoutingAnimation } from './dashboard-routing.animations';
import { dashboardAnimation } from './dashboard.animations';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [
        dashboardRoutingAnimation,
        dashboardAnimation
    ]
})
export class DashboardComponent {

    // bind dashboardAnimation animation on host
    @HostBinding('@dashboardAnimation') dashboardAnimation = '';
}
