import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpErrorHandlerService } from '../../services/http-error-handler/http-error-handler.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(
        private _httpErrorHandlerService: HttpErrorHandlerService
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(tap(
                () => {},
                (err: any) => {
                    if (err instanceof HttpErrorResponse) {
                        this._httpErrorHandlerService.handleError(err);
                    }
                }
            ));
    }
}
