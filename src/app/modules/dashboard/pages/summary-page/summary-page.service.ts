import { ApiService } from 'src/app/core/services/api/api.service';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { map, catchError, take } from 'rxjs/operators';

@Injectable()
export class SummaryPageService {

    constructor(
        private _api: ApiService
    ) { }

    getSummary(data): Observable<any> {
        return this._api.post('/summary-data', data)
            .pipe(take(1))
            .pipe(
                map((res: any) => {
                    if (res.status === 200) {
                        console.log(res.data);
                        return res.data;
                    }

                    throw new Error(res.message);
                })
            )
            .pipe(catchError(err => throwError(err)));
    }
}
