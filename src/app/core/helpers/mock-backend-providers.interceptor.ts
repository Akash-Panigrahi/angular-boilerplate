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

                        const reports = REPORTS.filter(report => {
                            const { start_date, end_date, start_time, end_time } = report;
                            const [start_hour, start_minute] = start_time.split(':');
                            const [end_hour, end_minute] = end_time.split(':');

                            const { startDate, endDate, startTime, endTime } = request.body;

                            const reportStartDate = new Date(new Date(start_date).setHours(+start_hour, +start_minute));
                            const reportEndDate = new Date(new Date(end_date).setHours(+end_hour, +end_minute));
                            const requestStartDate = new Date(`${startDate} ${startTime}`);
                            const requestEndDate = new Date(`${endDate} ${endTime}`);

                            return reportStartDate <= reportEndDate
                                && reportStartDate >= requestStartDate
                                && reportStartDate <= requestEndDate
                                && reportEndDate <= requestEndDate
                                && reportEndDate >= requestStartDate
                                ;
                        });

                        console.log(reports);

                        return of(new HttpResponse({
                            status: 200,
                            body: {
                                status: 200,
                                data: reports,
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
