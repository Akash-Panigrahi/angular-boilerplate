import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { take, map } from 'rxjs/operators';
import { HttpParamsOptions } from '@angular/common/http/src/params';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(
        private _http: HttpClient
    ) { }

    private _prepareParams(params: HttpParamsOptions['fromObject']): HttpParams {
        return new HttpParams({
            fromObject: params
        });
    }

    private _getURL(): string {
        return environment.baseUrl;
    }

    // using T to return custom type
    post<T>(endpoint: string, data: object): Observable<T> {
        return this._http
            .post<T>(`${this._getURL() + endpoint}`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
    }

    // using T to return custom type
    get<T>(endpoint: string, params: object): Observable<T> {
        return this._http
            .get<T>(this._getURL() + endpoint, {
                params: this._prepareParams(params as HttpParamsOptions['fromObject'])
            });
    }

    getSoundFileURL(endpoint: string, params: string): string {
        return `${this._getURL() + endpoint}/${params}`;
    }

    getCSVFile(endpoint: string, params: object): Observable<any> {
        return this._http
            .get(this._getURL() + endpoint, {
                params: this._prepareParams(params as HttpParamsOptions['fromObject']),
                responseType: 'text' as 'json',
                observe: 'response'
            })
            .pipe(
                map(res => {
                    return {
                        filename: res.headers.get('content-disposition').split('=')[1],
                        data: res.body
                    };
                })
            );
    }
}
