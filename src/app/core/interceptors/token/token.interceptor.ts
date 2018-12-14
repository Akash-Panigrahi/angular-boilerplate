import { Injectable } from '@angular/core';
import { CoreModule } from '../../core.module';
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

@Injectable({
    providedIn: CoreModule
})
export class TokenInterceptor implements HttpInterceptor {

    constructor(private _router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        request = request.clone({
            setHeaders: {
                Authorization: sessionStorage.getItem('token')
            }
        });

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
                            console.error(err);

                            if (err.status === 401 || err.status === 403) {

                                sessionStorage.setItem('token', '');
                                if (err.error && err.error.error_code === 4000) {
                                    console.error('error', 'Session expire due to inactive. Redirect to login');
                                } else if (err.error && err.error.code === 403) {
                                    console.error('error', 'User not authorized to access. Redirect to login');
                                }

                                // redirect to the login route
                                this._router.navigate(['login']);
                            }
                        }
                    }
                )
            );
    }
}

