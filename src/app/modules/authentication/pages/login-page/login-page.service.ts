import { HttpService } from 'src/app/core/services/http/http.service';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { map, catchError, take } from 'rxjs/operators';
import { ILoginResponse, ILoginData } from 'src/app/core/interfaces/login.interface';

@Injectable()
export class LoginPageService {

    constructor(
        private _api: HttpService
    ) { }

    login(data): Observable<ILoginData> {
        return this._api.post('/login', data)
            .pipe(take(1))
            .pipe(
                map((res: ILoginResponse) => {
                    if (res.status === 200) {
                        sessionStorage.setItem('user', JSON.stringify(res.data));
                        return res.data;
                    }

                    throw new Error(res.message);
                })
            )
            .pipe(catchError(err => throwError(err)));
    }
}
