import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { environment } from 'src/environments/environment';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { ModuleAlreadyLoadedGuard } from './guards/module-already-loaded/module-already-loaded.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MockBackendInterceptor } from './interceptors/mock-backend.interceptor';
import { TokenInterceptor } from './interceptors/token/token.interceptor';

@NgModule({
    declarations: [PageNotFoundComponent],
    imports: [CommonModule, RouterModule],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        },
        {
            // mock provider for faking backend
            provide: HTTP_INTERCEPTORS,
            useClass: MockBackendInterceptor,
            multi: true
        }
    ]
})
export class CoreModule {
    constructor(
        @Optional() @SkipSelf() parentModule: CoreModule,
        private _moduleAlreadyLoadedGuard: ModuleAlreadyLoadedGuard
    ) {
        /*
            checking to see if module is already loaded.
            if yes, throw an error
        */
        this._moduleAlreadyLoadedGuard.throwIfAlreadyLoaded(parentModule, 'CoreModule');

        if (!environment.production) {
            console.log('CoreModule loaded');
        }
    }
}
