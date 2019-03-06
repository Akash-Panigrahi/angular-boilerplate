import { Component, OnInit, OnDestroy } from '@angular/core';
import { IHeaderAngularComp } from 'ag-grid-angular';
import { IHeaderParams } from 'ag-grid-community';
import { Subject } from 'rxjs';
import { ChangeToNoSortStorageService } from '../../services/change-to-no-sort-state/change-to-no-sort-state.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { take, takeUntil } from 'rxjs/operators';
import { DetailsGridRequest } from 'src/app/views/dashboard/interfaces/details-grid.interfaces';

@Component({
    selector: 'app-details-grid-header',
    templateUrl: './details-grid-header.component.html',
    styleUrls: ['./details-grid-header.component.scss']
})
export class DetailsGridHeaderComponent implements IHeaderAngularComp, OnInit, OnDestroy {
    private _onDestroy$ = new Subject<void>();

    params: IHeaderParams;
    colId: string;

    ascSort: string;
    descSort: string;
    noSort: string;

    /**
     * initial sorting directions
     * if user is not logged in
     */
    currDirection = 0;
    nextDirection = 1;

    constructor(
        private _changeToNoSortState: ChangeToNoSortStorageService,
        private _storage: StorageService
    ) {}

    ngOnInit() {
        /**
         * listen to events for skipping the specified
         * header component
         * and reset all components to no sort state
         */
        this._changeToNoSortState.currentNoSortState
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(columnToSkip => {
                if (this.colId !== columnToSkip) {
                    this.currDirection = 0;
                    this.setSortDirection(this.currDirection);
                }
            });

        /**
         * to restore column ui state for sorting
         */
        this._storage
            .getItem('details-grid-request')
            /**
             * Using takeUntil operator to unsubscribe
             * from _storage stream.
             * Even if stream is completed by invoking complete on it
             * this particular component may not need it,
             * hence its better to unsubscribe to stream at
             * ngOnDestroy lifecycle
             */
            .pipe(takeUntil(this._onDestroy$))
            .subscribe((detailsGridRequestData: DetailsGridRequest) => {
                const { key, direction } = detailsGridRequestData.sort;

                if (key === this.colId) {
                    /** set ui state of this header component */
                    this.currDirection = direction;
                    this.setSortDirection(this.currDirection);

                    /** set ui state of sibling header components to noSort */
                    this._changeToNoSortState.changeToNoSortState(this.colId);
                }
            });
    }

    agInit(params: IHeaderParams): void {
        this.params = params;
        this.colId = this.params.column.getColId();
    }

    setSortDirection(direction: number): void {

        // hide all sort icons
        this.ascSort = this.descSort = this.noSort = 'inactive';

        switch (direction) {
            case 1:
                // show the icon
                this.ascSort = 'active';
                // set the current sort direction
                this.currDirection = 1;
                // set the sort direction to the next one
                this.nextDirection = -1;
                break;
            case -1:
                this.descSort = 'active';
                this.currDirection = -1;
                this.nextDirection = 0;
                break;
            case 0:
                this.noSort = 'active';
                this.currDirection = 0;
                this.nextDirection = 1;
                break;
        }
    }

    onHeaderClick(target: HTMLElement, colId: string): void {

        /**
         * change sort directions of all sibling header components to 0
         * expect for the given colId
         */
        this._changeToNoSortState.changeToNoSortState(colId);

        /**
         * dispatch the custom click event with the specified data
         * observable can also be used
         */
        target.dispatchEvent(
            new CustomEvent('detailsTableSortChangeEvent', {
                detail: {
                    key: colId,
                    direction: this.nextDirection
                },
                bubbles: true
            })
        );

        // now modify the sort direction and change the icon according
        this.setSortDirection(this.currDirection);
    }

    ngOnDestroy() {
        this._onDestroy$.next();
    }
}
