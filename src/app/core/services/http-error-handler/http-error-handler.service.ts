import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastComponent } from '../../components/toast/toast.component';
import { MatSnackBar } from '@angular/material';
import { LogoutService } from '../logout/logout.service';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class HttpErrorHandlerService {

    constructor(
        private _snackBar: MatSnackBar,
        private _logout: LogoutService,
        private _router: Router
    ) {}

    handleError(err: HttpErrorResponse): void {
        this.logError(err);

        switch (err.status) {
            case 400: this.handle400(); break; // Bad Request
            case 401: this.handle401(); break; // Unauthorized
            case 403: this.handle403(); break; // Forbidden
            case 404: this.handle404(); break; // Not Found
            case 500: this.handle500(); break; // Internal Server Error
        }
    }

    handle400(): void {
        this._snackBar
            .openFromComponent(ToastComponent, {
                data: {
                    message: 'A bad request was sent.',
                    status: 'warning'
                }
            });
    }

    handle401(): void {
        this._snackBar
            .openFromComponent(ToastComponent, {
                data: {
                    message: 'You are not authorized to access this resource. Redirecting you to Login page.',
                    status: 'warning'
                },
                duration: 3500
            })
            .afterDismissed()
            .pipe(take(1))
            .subscribe(() => this._logout.logout());
    }

    handle403(): void {
        this._snackBar
            .openFromComponent(ToastComponent, {
                data: {
                    message: 'You do not have permission to access this resource.',
                    status: 'error'
                }
            });
    }

    handle404(): void {
        this._snackBar
            .openFromComponent(ToastComponent, {
                data: {
                    message: 'The requested resource was not found.',
                    status: 'warning'
                }
            });
    }

    handle500(): void {
        this._router.navigateByUrl('/500');
    }

    logError(err: HttpErrorResponse): void {
        console.group(`${err.status} ${err.statusText}`);
        console.log('URL:', err.url);
        console.groupEnd();
    }
}
