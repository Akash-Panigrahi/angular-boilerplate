import {
    HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor
} from '@angular/common/http';
import {
    Observable, of
} from 'rxjs';
import {
    delay, mergeMap, materialize, dematerialize
} from 'rxjs/operators';

// mock datasets
import { USERS } from '../mocks/users.mock';
import { REPORTS } from '../mocks/report.mock';
import { SUMMARY } from '../mocks/summary.mock';

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
                        // const { startDate, endDate, startTime, endTime, start, length, draw } = request.body;
                        const { startDate, endDate, startTime, endTime } = request.body;

                        const totalReports = REPORTS.filter(report => {

                            const { start_date, end_date, start_time, end_time } = report;
                            const [start_hour, start_minute] = start_time.split(':').map(parseFloat);
                            const [end_hour, end_minute] = end_time.split(':').map(parseFloat);
                            const reportStartDate = new Date(new Date(start_date).setHours(start_hour, start_minute));
                            const reportEndDate = new Date(new Date(end_date).setHours(end_hour, end_minute));

                            const requestStartDate = new Date(`${startDate} ${startTime}`);
                            const requestEndDate = new Date(`${endDate} ${endTime}`);

                            return reportStartDate <= reportEndDate
                                && reportStartDate >= requestStartDate
                                && reportStartDate <= requestEndDate
                                && reportEndDate <= requestEndDate
                                && reportEndDate >= requestStartDate
                                ;
                        });

                        // const filteredReports = totalReports
                        //     .slice(start, start + length)
                        //     ;

                        // const data = {
                        //     draw,
                        //     recordsFiltered: totalReports.length,
                        //     recordsTotal: totalReports.length,
                        //     data: filteredReports
                        // }

                        // console.log(data);

                        return of(new HttpResponse({
                            status: 200,
                            body: {
                                status: 200,
                                data: totalReports,
                                message: 'success'
                            }
                        }));
                    }

                    if (request.url.endsWith('/summary-data') && request.method === 'POST') {

                        const summary = SUMMARY.reduce((summaries: any, summary) => {

                            const { start_date, end_date, start_time, end_time } = summary;
                            const [start_hour, start_minute] = start_time.split(':').map(parseFloat);
                            const [end_hour, end_minute] = end_time.split(':').map(parseFloat);
                            const summaryStartDate = new Date(new Date(start_date).setHours(start_hour, start_minute));
                            const summaryEndDate = new Date(new Date(end_date).setHours(end_hour, end_minute));

                            const { startDate, endDate, startTime, endTime } = request.body;
                            const requestStartDate = new Date(`${startDate} ${startTime}`);
                            const requestEndDate = new Date(`${endDate} ${endTime}`);

                            if (
                                summaryStartDate <= summaryEndDate &&
                                summaryStartDate >= requestStartDate &&
                                summaryStartDate <= requestEndDate &&
                                summaryEndDate <= requestEndDate &&
                                summaryEndDate >= requestStartDate
                            ) {

                                const gradientPie = [];

                                for (let i = 0; i < summary.gradientPie.length; i++) {
                                    const pie = summary.gradientPie[i];

                                    if (pie.name === summaries.gradientPie[i].name) {
                                        gradientPie.push({
                                            name: pie.name,
                                            y: +(((+pie.y) + (+summaries.gradientPie[i].y)).toFixed(2))
                                        });
                                    }
                                }

                                const basicColumn = [];

                                for (let i = 0; i < summary.basicColumn.length; i++) {
                                    const column = summary.basicColumn[i];

                                    if (column.name === summaries.basicColumn[i].name) {
                                        basicColumn.push({
                                            name: column.name,
                                            data: column.data.map((data, j) => +((+data) + (+summaries.basicColumn[i].data[j])).toFixed(2))
                                        });
                                    }
                                }

                                summaries = {
                                    kpis: {
                                        total_calls: summary.kpis.total_calls + summaries.kpis.total_calls,
                                        inbound_calls: summary.kpis.inbound_calls + summaries.kpis.inbound_calls,
                                        outbound_calls: summary.kpis.outbound_calls + summaries.kpis.outbound_calls
                                    },
                                    gradientPie,
                                    basicColumn
                                };
                            }

                            return summaries;
                        }, {
                                kpis: {
                                    total_calls: 0,
                                    inbound_calls: 0,
                                    outbound_calls: 0
                                },
                                gradientPie: [
                                    {
                                        name: 'Chrome',
                                        y: 0
                                    },
                                    {
                                        name: 'Internet Explorer',
                                        y: 0
                                    },
                                    {
                                        name: 'Firefox',
                                        y: 0
                                    },
                                    {
                                        name: 'Edge',
                                        y: 0
                                    },
                                    {
                                        name: 'Safari',
                                        y: 0
                                    },
                                    {
                                        name: 'Other',
                                        y: 0
                                    }
                                ],
                                basicColumn: [
                                    {
                                        name: 'Tokyo',
                                        data: ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0']
                                    },
                                    {
                                        name: 'New York',
                                        data: ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0']
                                    },
                                    {
                                        name: 'London',
                                        data: ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0']
                                    },
                                    {
                                        name: 'Berlin',
                                        data: ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0']
                                    }
                                ]
                            }
                        );

                        return of(new HttpResponse({
                            status: 200,
                            body: {
                                status: 200,
                                data: summary,
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
