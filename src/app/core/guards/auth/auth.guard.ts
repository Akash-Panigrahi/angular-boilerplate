import { Injectable } from '@angular/core';
import { CoreModule } from '../../core.module';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: CoreModule
})
export class AuthGuard implements CanActivate {

    constructor(private _router: Router) { }

    canActivate(): Observable<boolean> | boolean {

        if (sessionStorage.getItem('token')) {
            return true;
        }

        this._router.navigateByUrl('/');
        return false;
    }
}
