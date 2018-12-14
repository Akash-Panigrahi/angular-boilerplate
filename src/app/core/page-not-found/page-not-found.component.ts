import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-page-not-found',
    templateUrl: 'page-not-found.component.html',
    styleUrls: ['page-not-found.component.scss']
})
export class PageNotFoundComponent {
    constructor() {
        if (!environment.production) {
            console.log('PageNotFoundComponent loaded');
        }
    }
}
