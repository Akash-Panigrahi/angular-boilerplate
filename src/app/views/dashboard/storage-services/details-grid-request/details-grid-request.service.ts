import { Injectable, OnDestroy } from '@angular/core';
import { DetailsGridRequest } from '../../types/details-grid';
import { Subject, Observable } from 'rxjs';
import { StorageService } from 'src/app/core/services/storage/storage.service';

@Injectable()
export class DetailsGridRequestService implements OnDestroy {

    private _destroy$ = new Subject<void>();

    constructor(private _storage: StorageService) {}

    set(detailsGridRequest: DetailsGridRequest): void {
        this._storage.setItem('details-grid-request', detailsGridRequest);
    }

    get(): Observable<any> {
        if (!this.current()) {
            this.reset();
        }

        return this._storage.getItem('details-grid-request');
    }

    initial(): DetailsGridRequest {
        return {
            start: 0,
            length: 5,
            search: '',
            sort_key: 'id',
            sort_direction: 1
        };
    }

    reset(): void {
        this.set(this.initial());
    }

    current(): DetailsGridRequest {
        const current = sessionStorage.getItem('details-grid-request');

        return current ? JSON.parse(current) : this.initial();
    }

    ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
    }
}
