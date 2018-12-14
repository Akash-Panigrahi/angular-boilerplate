import { Injectable } from '@angular/core';
import { CoreModule } from '../../core.module';
import { Router } from '@angular/router';

@Injectable({
    providedIn: CoreModule
})
export class LogoutService {

    constructor(private _router: Router) { }

    logout() {
        sessionStorage.clear();
        this._router.navigateByUrl('/');
    }
}
