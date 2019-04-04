import { ApiService } from 'src/app/core/http/api/api.service';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { map, catchError, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DateTimeRange } from '../../interfaces/date-time-range.interface';

@Injectable()
export class DetailsPageService {

    constructor(
        private _api: ApiService
    ) { }

    getDetails(data: DateTimeRange): Observable<any> {
        return this._api.post('/details', data)
            .pipe(take(1))
            .pipe(
                map((res: any) => {
                    if (res.status === 200) {
                        return res.data;
                    }

                    throw new Error(res.message);
                })
            )
            .pipe(catchError(err => throwError(err)));
    }

    downloadDetails(query): void {
        window.open(`${environment.BASE_URL}/get-details-file${query}`, '_blank');
    }
}
