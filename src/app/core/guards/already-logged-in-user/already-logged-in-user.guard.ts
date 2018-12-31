import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AlreadyLoggedInUserGuard implements CanActivate {

    constructor() { }

    canActivate(): boolean {

        if (!sessionStorage.getItem('user')) {
            return true;
        }

        return false;
    }
}
