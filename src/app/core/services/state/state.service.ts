import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StateService {

    getState(key: string) {
        return JSON.parse(sessionStorage.getItem(key));
    }

    setState(key: string, value: any): void {
        sessionStorage.setItem(key, JSON.stringify(value));
    }

    clearState() {
        sessionStorage.clear();
    }
}
