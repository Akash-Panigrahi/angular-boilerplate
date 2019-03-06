import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, take, filter } from 'rxjs/operators';
import { StorageService } from '../../services/storage/storage.service';
import { LoginData } from 'src/app/views/authentication/interfaces/login.interfaces';

/**
 * not using providedIn
 * since it does not supports multi option
 * for specifying multiple interceptors
 */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(
        private _router: Router,
        private _storage: StorageService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let token: string;

        this._storage
            .getItem('user')
            .pipe(
                take(1),
                filter(userData => userData ? true : false),
                // tap(console.log)
            )
            .subscribe((userData: LoginData) => token = userData.token);

        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: token
                }
            });
        }

        return next
            .handle(request)
            .pipe(
                tap(
                    (event: HttpEvent<any>) => {
                        if (event instanceof HttpResponse) {
                            // do stuff with response if you want
                        }
                    },
                    (err: any) => {
                        if (err instanceof HttpErrorResponse) {
                            if (err.status === 401 || err.status === 403) {

                                this._storage.removeItem('token');

                                if (err.error && err.error.code === 4000) {

                                    console.error('error', 'Session expire due to inactive. Redirect to login');

                                } else if (err.error && err.error.code === 403) {

                                    console.error('error', 'User not authorized to access. Redirect to login');
                                }

                                // redirect to the login route
                                this._router.navigate(['/login']);
                            }
                        }
                    }
                )
            );
    }
}
