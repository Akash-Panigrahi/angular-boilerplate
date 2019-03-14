import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { LoginData } from 'src/app/views/authentication/interfaces/login.interfaces';
import { DetailsGridRequest } from 'src/app/views/dashboard/interfaces/details-grid.interfaces';
import { DateTimeRange } from 'src/app/views/dashboard/interfaces/date-time-range.interface';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    private itemSources: Map<string, BehaviorSubject<StorageItemsTypes>> = new Map();
    storage = sessionStorage;

    constructor() {
        addEventListener('storage', (event: StorageEvent) => {
            if (event.key) {
                if (this.itemSources.has(event.key)) {
                    this.itemSources.get(event.key).next(JSON.parse(event.newValue));
                }
            }
        });
    }

    getItem(key: string): Observable<StorageItemsTypes> {

        // console.log(`storage ${this.itemSources.has(key) ? '' : 'does not '}has ${key} with value ${this.storage.getItem(key)}`);

        if (!this.itemSources.has(key)) {
            this.itemSources.set(key, new BehaviorSubject<StorageItemsTypes>(JSON.parse(this.storage.getItem(key))));
        }

        return this.itemSources.get(key).asObservable();
    }

    setItem(key: string, value: StorageItemsTypes): void {

        // console.log(`setting ${key} in storage`);

        try {
            this.storage.setItem(key, JSON.stringify(value));
            if (this.itemSources.has(key)) {
                this.itemSources.get(key).next(JSON.parse(this.storage.getItem(key)));
            }
        } catch (error) {
            this.itemSources.get(key).error(error);
        }
    }

    removeItem(key: string): void {
        this.storage.removeItem(key);

        if (this.itemSources.has(key)) {
            this.itemSources.get(key).next(JSON.parse(this.storage.getItem(key))); // Expect to be null
            this.itemSources.delete(key);
        }
    }

    clear(): void {
        this.storage.clear();
        this.itemSources.forEach((itemSource: BehaviorSubject<StorageItemsTypes>) => {
            // itemSource.next(null);
            itemSource.complete();
        });

        this.itemSources.clear();
    }
}

type StorageItemsTypes = LoginData | DetailsGridRequest | DateTimeRange;
