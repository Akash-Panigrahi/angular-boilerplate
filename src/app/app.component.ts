import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgProgressComponent } from '@ngx-progressbar/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

import { appRoutingAnimation } from './app-routing.animations';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [appRoutingAnimation]
})
export class AppComponent implements OnInit, AfterViewInit {

    // getting a reference to the progress bar in the html file
    @ViewChild('progressBar') private _progressBar: NgProgressComponent;

    constructor(
        private _title: Title,
        private _router: Router,
        private _activatedRoute: ActivatedRoute
    ) { }

    ngOnInit() {
        this._router
            .events
            .pipe(
                filter(e => e instanceof NavigationEnd),
                map(() => {
                    let route = this._activatedRoute.firstChild;
                    let child = route;

                    while (child) {
                        if (child.firstChild) {
                            child = child.firstChild;
                            route = child;
                        } else {
                            child = null;
                        }
                    }

                    return route;
                }),
                mergeMap(route => route.data)
            )
            .subscribe(data => {
                this._title.setTitle(`Basic | ${data.title}`);
            })
            ;
    }

    ngAfterViewInit() {
        // setting progress bar configurations
        this._progressBar.color = 'red';
        this._progressBar.spinner = false;
    }
}
