import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

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

                        const { fromDate, toDate, fromTime, toTime, start, length, search, sort } = request.body;

                        let totalWithoutSearch = 0;
                        let totalWithSearch = 0;

                        const totalDetails = DETAILS
                            .filter(detail => {

                                const { date, time } = detail;
                                const [hour, minute] = time.split(':').map(parseFloat);
                                const detailsDate = new Date(new Date(date).setHours(hour, minute));

                                const requestFromDate = new Date(`${fromDate} ${fromTime}`);
                                const requestToDate = new Date(`${toDate} ${toTime}`);

                                if (detailsDate >= requestFromDate && detailsDate <= requestToDate) {

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

                                if (typeof (prev[sort.key]) === 'number') {
                                    switch (sort.direction) {
                                        case 1:
                                            // ascending sort
                                            return prev[sort.key] - curr[sort.key];
                                        case -1:
                                            // descending sort
                                            return curr[sort.key] - prev[sort.key];
                                        case 0:
                                            // no sort
                                            return 0;
                                    }

                                } else if (typeof (prev[sort.key]) === 'string') {
                                    switch (sort.direction) {
                                        case 1:
                                            // ascending sort
                                            return prev[sort.key].localeCompare(curr[sort.key]);
                                        case -1:
                                            // descending sort
                                            return curr[sort.key].localeCompare(prev[sort.key]);
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
                        // console.groupTo();

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

                            const { from_date, to_date, from_time, to_time } = summary;
                            const [from_hour, from_minute] = from_time.split(':').map(parseFloat);
                            const [to_hour, to_minute] = to_time.split(':').map(parseFloat);
                            const summaryFromDate = new Date(new Date(from_date).setHours(from_hour, from_minute));
                            const summaryToDate = new Date(new Date(to_date).setHours(to_hour, to_minute));

                            const { fromDate, toDate, fromTime, toTime } = request.body;
                            const requestFromDate = new Date(`${fromDate} ${fromTime}`);
                            const requestToDate = new Date(`${toDate} ${toTime}`);

                            if (
                                summaryFromDate <= summaryToDate &&
                                summaryFromDate >= requestFromDate &&
                                summaryFromDate <= requestToDate &&
                                summaryToDate <= requestToDate &&
                                summaryToDate >= requestFromDate
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
