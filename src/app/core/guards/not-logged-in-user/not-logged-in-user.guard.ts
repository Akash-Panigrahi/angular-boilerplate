import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { StateService } from '../../services/state/state.service';

@Injectable({
    providedIn: 'root'
})
export class NotLoggedInUserGuard implements CanActivate {

    constructor(
        private _router: Router,
        private _state: StateService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        const user = this._state.get('user');

        // if route is of login page and user is already logged in
        if (state.url === '/login') {

            if (user) {
                this._router.navigateByUrl('/');
                return false;
            }

            return true;
        }

        // else if route is not of login page
        if (user) {
            return true;
        }

        // not logged in so redirect to login page with the return url
        this._router.navigateByUrl('/login');
        return false;
    }
}
