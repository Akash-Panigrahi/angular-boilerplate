import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { LoginData } from 'src/app/core/types/login';
import { DetailsGridRequest } from 'src/app/views/dashboard/types/details-grid';
import { DateValue } from 'src/app/views/dashboard/types/date-value';
import { DateTimeRange } from 'src/app/views/dashboard/types/date-time-range';

@Injectable()
export class StorageService {

    /*
        BehaviorSubject is a kind of Subject that allows to set initial value of stream.
        Subject allows for multicasting,
        so multiple components can listen to one data source.
    */

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

        // creating an observable from source for listening components to subscribe to
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

type StorageItemsTypes = LoginData | DetailsGridRequest | DateValue | DateTimeRange | string;
