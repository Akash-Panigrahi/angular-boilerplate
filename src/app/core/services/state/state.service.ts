import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StateService {

    get(key: string) {
        return JSON.parse(sessionStorage.getItem(key));
    }

    set(key: string, value: any): void {
        sessionStorage.setItem(key, JSON.stringify(value));
    }

    clear(): void {
        sessionStorage.clear();
    }
}
