import { Component, OnInit } from '@angular/core';
import { dashboardRouterTransition } from './../../dashboard-router.animations';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
    animations: [dashboardRouterTransition]
})
export class HomePageComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

    getState(outlet) {
        return outlet.activatedRouteData.state;
    }

}
