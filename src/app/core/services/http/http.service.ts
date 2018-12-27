import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor(
        private _http: HttpClient
    ) { }

    private _prepareHeaders(headers: HttpHeaders = new HttpHeaders()): object {
        headers = headers.set('Content-Type', 'application/json');
        headers = headers.set('Accept', 'application/json');

        return { headers };
    }

    // HTTP VERBS

    post<T>(url: string, data: object, headers?: HttpHeaders | null): Observable<T> {
        return this._http.post<T>(`${environment.BASE_URL + url}`, data, this._prepareHeaders(headers))
            .pipe(take(1));
    }
}
