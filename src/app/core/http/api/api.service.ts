import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpParamsOptions } from '@angular/common/http/src/params';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(
        private _http: HttpClient
    ) { }

    private _prepareHeaders(headers = new HttpHeaders()): HttpHeaders {
        // setting default headers for api response
        headers = headers.set('Content-Type', 'application/json');
        headers = headers.set('Accept', 'application/json');

        return headers;
    }

    private _prepareParams(params: HttpParamsOptions['fromObject']): HttpParams {
        return new HttpParams({
            fromObject: params
        });
    }

    // using T to return custom type
    post<T>(url: string, data: object, headers?: HttpHeaders): Observable<T> {
        return this._http
            .post<T>(environment.BASE_URL + url, data, {
                headers: this._prepareHeaders(headers)
            });
    }

    get<T>(url: string, params: object, headers?: HttpHeaders): Observable<T> {
        return this._http
            .get<T>(environment.BASE_URL + url, {
                params: this._prepareParams(params as HttpParamsOptions['fromObject']),
                headers: this._prepareHeaders(headers)
            });
    }
}
