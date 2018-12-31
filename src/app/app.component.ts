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
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
    title = 'basic';

    @ViewChild('progressBar') private _progressBar: NgProgressComponent;

    private routerEvents$ = new Subscription();

    constructor() { }

    ngOnInit() {
    }

    ngAfterViewInit() {
        // setting progress bar config
        this._progressBar.color = 'red';
        this._progressBar.spinner = false;
    }

    getState(outlet) {
        return outlet.activatedRouteData.state;
    }

    ngOnDestroy() {
        this.routerEvents$.unsubscribe();
    }
}
