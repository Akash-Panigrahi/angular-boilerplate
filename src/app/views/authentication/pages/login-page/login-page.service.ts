import { ApiService } from 'src/app/core/http/api/api.service';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { map, catchError, take } from 'rxjs/operators';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { LoginResponse, LoginData } from '../../interfaces/login.interfaces';

@Injectable()
export class LoginPageService {

    constructor(
        private _api: ApiService,
        private _storage: StorageService
    ) { }

    login(data): Observable<LoginData> {
        return this._api.post('/login', data)
            /*
                Just take one value from the stream.
                This has the added benefit of unsubscribing to
                the stream after the value is emitted by default
            */
            .pipe(take(1))
            .pipe(
                map((res: LoginResponse) => {
                    if (res.status === 200) {
                        this._storage.setItem('user', res.data);
                        return res.data;
                    }

                    /*
                        throwing error will pass the message to the next pipe,
                        which the catchError operator will catch.
                        the throwError operator then will the pass the err to
                        the error observer in the subsciber function.
                    */
                    throw new Error(res.message);
                })
            )
            .pipe(catchError(err => throwError(err)));
    }
}
