import { Injectable } from '@angular/core';
import { CoreModule } from '../../core.module';
import { Router } from '@angular/router';
import { StateService } from '../state/state.service';

@Injectable({
    providedIn: CoreModule
})
export class LogoutService {

    constructor(
        private _router: Router,
        private _state: StateService
    ) { }

    logout() {

        // clear the state
        this._state.clearState();

        // redirect to '/' which will then redirect to login page
        this._router.navigateByUrl('/');
    }
}
