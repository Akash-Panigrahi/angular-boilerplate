import { ApiService } from 'src/app/core/http/api/api.service';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { map, catchError, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DateTimeRange } from '../../interfaces/date-time-range.interface';
import { DetailsGridRequest } from '../../interfaces/details-grid.interfaces';

@Injectable()
export class DetailsPageService {

    constructor(
        private _api: ApiService
    ) { }

    getDetails(data: TableRequest): Observable<any> {

        return this._api.get('/details', data)
            .pipe(take(1))
            .pipe(
                map((res: any) => {
                    return res;
                })
            )
            .pipe(catchError(err => throwError(err)));
    }

    downloadDetails(query): void {
        window.open(`${environment.BASE_URL}/get-details-file${query}`, '_blank');
    }
}


export type TableRequest = DetailsGridRequest & DateTimeRange;