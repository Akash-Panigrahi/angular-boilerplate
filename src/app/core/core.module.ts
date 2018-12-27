import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { environment } from 'src/environments/environment';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { mockBackendProvider } from './helpers/mock-backend-providers.interceptor';

@NgModule({
    declarations: [PageNotFoundComponent],
    imports: [
        CommonModule,
        CoreRoutingModule,
    ],
    providers: [mockBackendProvider]
})
export class CoreModule {
    constructor() {
        if (!environment.production) {
            console.log('CoreModule loaded');
        }
    }
}
