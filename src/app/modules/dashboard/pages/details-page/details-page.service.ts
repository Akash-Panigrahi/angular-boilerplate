import { ApiService } from 'src/app/core/http/api/api.service';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { map, catchError, take } from 'rxjs/operators';

@Injectable()
export class DetailsPageService {

    constructor(
        private _api: ApiService
    ) { }

    getDetails(data): Observable<any> {
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
}
