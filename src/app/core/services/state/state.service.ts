import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StateService {

    private static _db = {};

    getState(key: string) {
        return StateService._db[key]
            ? JSON.parse(StateService._db[key])
            : null;
    }

    setState(key: string, value: any): void {
        StateService._db[key] = JSON.stringify(value);
    }

    clearState() {
        StateService._db = {};
    }
}
