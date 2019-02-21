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
import { tap } from 'rxjs/operators';
import { StateService } from '../../services/state/state.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(
        private _router: Router,
        private _state: StateService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const user = this._state.get('user');

        if (user) {
            request = request.clone({
                setHeaders: {
                    Authorization: user.token
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

                                this._state.set('token', '');

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
