import { Component, HostBinding } from '@angular/core';
import { environment } from 'src/environments/environment';
import { pageNotFoundAnimation } from './page-not-found.animations';

@Component({
    selector: 'app-page-not-found',
    templateUrl: 'page-not-found.component.html',
    styleUrls: ['page-not-found.component.scss'],
    animations: [
        pageNotFoundAnimation
    ]
})
export class PageNotFoundComponent {

    // animation
    @HostBinding('@pageNotFoundAnimation') get pageNotFoundAnimation() { return ''; }

    constructor() {
        if (!environment.production) {
            console.log('PageNotFoundComponent loaded');
        }
    }
}
