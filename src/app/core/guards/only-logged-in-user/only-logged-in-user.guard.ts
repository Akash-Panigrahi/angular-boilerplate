import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class OnlyLoggedInUserGuard implements CanActivate {

    constructor(private _router: Router) { }

    canActivate(): boolean {

        if (sessionStorage.getItem('user')) {
            return true;
        }

        this._router.navigateByUrl('/');
        return false;
    }
}
