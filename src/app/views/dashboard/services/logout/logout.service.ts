import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CacheService } from '../cache/cache.service';
import { StateService } from 'src/app/core/services/state/state.service';

@Injectable()
export class LogoutService {

    constructor(
        private _router: Router,
        private _state: StateService
    ) { }

    logout() {

        // clear the state
        this._state.clear();

        // clear the cache
        CacheService.clear();

        // redirect to '/login' which will then redirect to login page
        this._router.navigateByUrl('/login');
    }
}
