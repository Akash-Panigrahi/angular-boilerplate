import {
    HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS
} from '@angular/common/http';
import {
    Observable, of
} from 'rxjs';
import {
    delay, mergeMap, materialize, dematerialize
} from 'rxjs/operators';

// mock datasets
import { USERS } from './users';
import { REPORTS } from './report';

export class MockBackendInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        return of(null)
            .pipe(
                mergeMap(() => {

                    if (request.url.endsWith('/login') && request.method === 'POST') {
                        const user = USERS.find(user => {
                            return user.username === request.body.username && user.password === request.body.password;
                        });

                        const httpResponse = {
                            status: 200,
                            body: null
                        };

                        if (user) {

                            httpResponse.body = {
                                status: 200,
                                data: {
                                    token: 'fake-jwt-token',
                                    username: user.username,
                                    password: user.password
                                },
                                message: 'success'
                            };

                        } else {

                            httpResponse.body = {
                                status: 201,
                                message: 'Username or password is incorrect'
                            };
                        }

                        return of(new HttpResponse(httpResponse));
                    }

                    if (request.url.endsWith('/report') && request.method === 'POST') {
                        return of(new HttpResponse({
                            status: 200,
                            body: {
                                status: 200,
                                data: REPORTS,
                                message: 'success'
                            }
                        }));
                    }

                    return next.handle(request);
                })
            )
            .pipe(materialize())
            .pipe(delay(500))
            .pipe(dematerialize());
    }
}

export const mockBackendProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: MockBackendInterceptor,
    multi: true
};
