import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { StorageService } from '../../services/storage/storage.service';
import { LoginData } from 'src/app/views/authentication/interfaces/login.interfaces';
import { take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class NotLoggedInUserGuard implements CanActivate {

    constructor(
        private _router: Router,
        private _storage: StorageService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        let user: LoginData;

        this._storage
            .getItem('user')
            .pipe(take(1))
            .subscribe((userData: LoginData) => user = userData);

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
