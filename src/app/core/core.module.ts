import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { environment } from 'src/environments/environment';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { mockBackendProvider } from './helpers/mock-backend-providers.interceptor';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [PageNotFoundComponent],
    imports: [CommonModule, RouterModule],
    providers: [mockBackendProvider]
})
export class CoreModule {
    constructor() {
        if (!environment.production) {
            console.log('CoreModule loaded');
        }
    }
}
