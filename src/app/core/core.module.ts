import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { environment } from 'src/environments/environment';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { ModuleAlreadyLoadedGuard } from './guards/module-already-loaded/module-already-loaded.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token/token.interceptor';
import { CoreToastrComponent } from './components/core-toastr/core-toastr.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        PageNotFoundComponent,
        CoreToastrComponent
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
                panelClass: 'core-toastr',
                verticalPosition: 'top',
                horizontalPosition: 'end',
                duration: 2000
            }
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }
    ],
    entryComponents: [CoreToastrComponent]
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
