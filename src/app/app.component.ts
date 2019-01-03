import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { NgProgressComponent } from '@ngx-progressbar/core';
import { Subscription } from 'rxjs';
import { appRouterTransition } from './app-router.animations';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [appRouterTransition]
})
export class AppComponent implements OnInit, AfterViewInit {

    title = 'basic';

    // getting a reference to the progress bar in the html file
    @ViewChild('progressBar') private _progressBar: NgProgressComponent;

    constructor() { }

    ngOnInit() {
    }

    ngAfterViewInit() {
        // setting progress bar configurations
        this._progressBar.color = 'red';
        this._progressBar.spinner = false;
    }

    getState(outlet) {
        return outlet.activatedRouteData.state;
    }
}
