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
import { DETAILS } from '../mocks/details.mock';
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
                    console.log('%cNetwork Hit!',
                        'color: #232323; background-color: skyblue; padding: 5px; border-radius: 10px;'
                    );

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

                    if (request.url.endsWith('/details') && request.method === 'POST') {

                        const { startDate, endDate, startTime, endTime, start, length, search, sort } = request.body;

                        let totalWithoutSearch = 0;
                        let totalWithSearch = 0;

                        const totalDetails = DETAILS
                            .filter(detail => {

                                const { date, time } = detail;
                                const [hour, minute] = time.split(':').map(parseFloat);
                                const detailsDate = new Date(new Date(date).setHours(hour, minute));

                                const requestStartDate = new Date(`${startDate} ${startTime}`);
                                const requestEndDate = new Date(`${endDate} ${endTime}`);

                                if (detailsDate >= requestStartDate && detailsDate <= requestEndDate) {

                                    totalWithoutSearch++;

                                    // search/filter block
                                    for (const detailVal of Object.values(detail)) {
                                        if (detailVal.toString().toLowerCase().includes(search)) {
                                            totalWithSearch++;
                                            return true;
                                        }
                                    }
                                }

                                return false;
                            })
                            .sort((prev, curr) => {

                                if (typeof (prev[sort.sortKey]) === 'number') {
                                    switch (sort.sortDir) {
                                        case 1:
                                            // ascending sort
                                            return prev[sort.sortKey] - curr[sort.sortKey];
                                        case -1:
                                            // descending sort
                                            return curr[sort.sortKey] - prev[sort.sortKey];
                                        case 0:
                                            // no sort
                                            return 0;
                                    }

                                } else if (typeof (prev[sort.sortKey]) === 'string') {
                                    switch (sort.sortDir) {
                                        case 1:
                                            // ascending sort
                                            return prev[sort.sortKey].localeCompare(curr[sort.sortKey]);
                                        case -1:
                                            // descending sort
                                            return curr[sort.sortKey].localeCompare(prev[sort.sortKey]);
                                        case 0:
                                            // no sort
                                            return 0;
                                    }
                                }
                            })
                            ;

                        const from = start * length
                            , to = totalWithSearch < (start * length) + length
                                ? totalWithSearch
                                : (start * length) + length
                            ;

                        const filteredDetails = totalDetails.slice(from, to);

                        const data = {
                            data: filteredDetails,
                            info: {
                                from: from + 1,
                                to,
                                total: totalWithSearch,
                                filteredFrom: totalWithoutSearch
                            }
                        };

                        // console.group('request-response');
                        // console.log('Request', request.body);
                        // console.log('Response', data);
                        // console.groupEnd();

                        return of(new HttpResponse({
                            status: 200,
                            body: {
                                status: 200,
                                data,
                                message: 'success'
                            }
                        }));
                    }

                    if (request.url.endsWith('/summary') && request.method === 'POST') {

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
