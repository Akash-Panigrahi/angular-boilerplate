import { Component, HostBinding } from '@angular/core';
import { dashboardRouterAnimation } from '../../dashboard-router.animations';
import { dashboardPageAnimation } from './dashboard-page.animations';

@Component({
    selector: 'app-dashboard-page',
    templateUrl: './dashboard-page.component.html',
    styleUrls: ['./dashboard-page.component.scss'],
    animations: [
        dashboardRouterAnimation,
        dashboardPageAnimation
    ]
})
export class DashboardPageComponent {

    // bind dashboardPageAnimation animation on host
    @HostBinding('@dashboardPageAnimation') dashboardPageAnimation = '';
}
