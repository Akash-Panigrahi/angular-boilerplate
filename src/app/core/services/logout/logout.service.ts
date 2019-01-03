import { Injectable } from '@angular/core';
import { CoreModule } from '../../core.module';
import { Router } from '@angular/router';

@Injectable({
    providedIn: CoreModule
})
export class LogoutService {

    constructor(private _router: Router) { }

    logout() {

        // clear the state
        sessionStorage.clear();

        // redirect to '/' which will then redirect to login page
        this._router.navigateByUrl('/');
    }
}
