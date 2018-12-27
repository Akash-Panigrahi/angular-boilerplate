import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { appRouterTransition } from './core/core-router.animations';
import {
    Router,
    Event,
    NavigationStart,
    NavigationEnd,
    NavigationCancel,
    NavigationError,
    RouterEvent,
} from '@angular/router';
import { NgProgressComponent } from '@ngx-progressbar/core';
import { Subscription } from 'rxjs';

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

    constructor(
        private _router: Router
    ) { }

    ngOnInit() {
        // this.routerEvents$ = this._router
        //     .events
        //     .subscribe((event: Event) => {
        //         this.navigationInterceptor(event);
        //     });
    }

    ngAfterViewInit() {
        // setting progress bar config
        this._progressBar.color = 'red';
        this._progressBar.spinner = false;
    }

    /**
     * This is used to intercept and show Loading bar based on the current state of our
     * Router navigation
     */
    private navigationInterceptor(event: Event): void {

        if (event instanceof NavigationStart) {
            this._progressBar.start();
        }
        if (event instanceof NavigationEnd) {
            this._progressBar.complete();
        }

        // Set loading state to false in both of the below events to hide the loader in case a request fails
        if (event instanceof NavigationCancel) {
            this._progressBar.set(0);
        }
        if (event instanceof NavigationError) {
            this._progressBar.set(0);
        }
    }

    getState(outlet) {
        return outlet.activatedRouteData.state;
    }

    ngOnDestroy() {
        this.routerEvents$.unsubscribe();
    }
}
