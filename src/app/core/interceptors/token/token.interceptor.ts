import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * not using providedIn
 * since it does not supports multi option
 * for specifying multiple interceptors
 */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const user = JSON.parse(sessionStorage.getItem('user'));

        if (user && user.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: user.token
                }
            });
        }

        return next.handle(request);
    }
}
