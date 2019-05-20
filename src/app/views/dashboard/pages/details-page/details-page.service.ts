import { ApiService } from 'src/app/core/http/api/api.service';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError, tap} from 'rxjs/operators';
import { DateTimeRange } from '../../types/date-time-range';
import { DetailsGridRequest } from '../../types/details-grid';
import { saveAs } from 'file-saver';

@Injectable()
export class DetailsPageService {

    constructor(
        private _api: ApiService
    ) { }

    getDetails(data: TableRequest): Observable<any> {
        return this._api.get('/details', data)
            .pipe(catchError(err => throwError(err)));
    }

    downloadDetails(params: object): Observable<any> {
        return this._api.getCSVFile('/get-details-file', params)
            .pipe(tap(fileData => this.downloadFile(fileData)));
    }

    downloadFile(fileData: any) {
        const { filename, data } = fileData;

        saveAs(
            new Blob(
                [(data as BlobPart)],
                { type: 'text/csv;charset=utf-8'}
            ),
            JSON.parse(filename)
        );
    }
}


export type TableRequest = DetailsGridRequest & DateTimeRange;
