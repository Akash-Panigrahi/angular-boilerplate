import { Component, HostBinding } from '@angular/core';
import { pageNotFoundAnimation } from './page-not-found.animations';

@Component({
    selector: 'app-page-not-found',
    templateUrl: 'page-not-found.component.html',
    styleUrls: ['page-not-found.component.scss'],
    animations: [pageNotFoundAnimation]
})
export class PageNotFoundComponent {

    // animation
    @HostBinding('@pageNotFoundAnimation')
    private _pageNotFoundAnimation = true;

    constructor() {}
}
