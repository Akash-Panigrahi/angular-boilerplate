import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { environment } from 'src/environments/environment';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { mockBackendProvider } from './interceptors/mock-backend-providers.interceptor';
import { RouterModule } from '@angular/router';
import { ModuleAlreadyLoadedGuard } from './guards/module-already-loaded/module-already-loaded.guard';

@NgModule({
    declarations: [PageNotFoundComponent],
    imports: [CommonModule, RouterModule],
    providers: [mockBackendProvider]
})
export class CoreModule {
    constructor(
        @Optional() @SkipSelf() parentModule: CoreModule,
        private _moduleAlreadyLoadedGuard: ModuleAlreadyLoadedGuard
    ) {
        this._moduleAlreadyLoadedGuard.throwIfAlreadyLoaded(parentModule, 'CoreModule');

        if (!environment.production) {
            console.log('CoreModule loaded');
        }
    }
}
