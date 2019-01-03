import { ApiService } from 'src/app/core/http/api/api.service';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { map, catchError, take } from 'rxjs/operators';
import { ILoginResponse, ILoginData } from 'src/app/core/interfaces/login.interface';
import { StateService } from 'src/app/core/services/state/state.service';

@Injectable()
export class LoginPageService {

    constructor(
        private _api: ApiService,
        private _state: StateService
    ) { }

    login(data): Observable<ILoginData> {
        return this._api.post('/login', data)
            /*
                Just take one value from the stream.
                This has the added benefit of unsubscribing to
                the stream after the value is emitted by default
            */
            .pipe(take(1))
            .pipe(
                map((res: ILoginResponse) => {
                    if (res.status === 200) {
                        this._state.setState('user', res.data);
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
