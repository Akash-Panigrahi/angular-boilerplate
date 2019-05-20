import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ModuleAlreadyLoadedGuard } from './guards/module-already-loaded/module-already-loaded.guard';
import { TokenInterceptor } from './interceptors/token/token.interceptor';
import { ToastComponent } from './components/toast/toast.component';
import { SharedModule } from '../shared/shared.module';
import { HttpErrorInterceptor } from './interceptors/http-error/http-error.interceptor';
import { HttpErrorHandlerService } from './services/http-error-handler/http-error-handler.service';
import { LogoutService } from './services/logout/logout.service';
import { StorageService } from './services/storage/storage.service';
import { InternalServerErrorComponent } from './components/internal-server-error/internal-server-error.component';

@NgModule({
    declarations: [
        PageNotFoundComponent,
        ToastComponent,
        InternalServerErrorComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        BrowserAnimationsModule,
        SharedModule
    ],
    providers: [
        {
            provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
            useValue: {
                panelClass: 'toast',
                verticalPosition: 'top',
                horizontalPosition: 'end',
                duration: 2000
            }
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpErrorInterceptor,
            multi: true
        },
        HttpErrorHandlerService,
        LogoutService,
        StorageService
    ],
    entryComponents: [ToastComponent]
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
