import { Component, OnInit, OnDestroy } from '@angular/core';
import { IHeaderAngularComp } from 'ag-grid-angular';
import { IHeaderParams } from 'ag-grid-community';
import { Subscription } from 'rxjs';
import { ChangeToNoSortStateService } from '../../services/change-to-no-sort-state/change-to-no-sort-state.service';
import { StateService } from 'src/app/core/services/state/state.service';

@Component({
    selector: 'app-details-grid-header',
    templateUrl: './details-grid-header.component.html',
    styleUrls: ['./details-grid-header.component.scss'],
})
export class DetailsGridHeaderComponent implements IHeaderAngularComp, OnInit, OnDestroy {

    private _currentNoSortState$ = new Subscription();

    params: IHeaderParams;
    ascSort: string;
    descSort: string;
    noSort: string;

    /**
     * initial sorting direction
     * if user is not logged in
     */
    direction = 0;

    constructor(
        private _changeToNoSortState: ChangeToNoSortStateService,
        private _state: StateService
    ) { }

    ngOnInit() {

        const colId = this.params.column.getColId();

        /**
         * listen to events for skipping the specified
         * header component
         * and reset all components to no sort state
         */
        this._currentNoSortState$ = this._changeToNoSortState
            .currentNoSortState
            .subscribe(columnToSkip => {
                if (colId !== columnToSkip) {
                    this.direction = 0;
                    this.setdirection();
                }
            });

        /**
         * to restore column ui state for sorting
         */
        const { key: sortKey, direction: sortDirection } = this._state.getState('details-table-request').sort;

        if (sortKey === colId) {
            this.direction = sortDirection;
            this.setdirection();
        }
    }

    agInit(params: IHeaderParams) {
        this.params = params;
        this.setdirection();
    }

    setdirection(): void {

        // hide all sort icons
        this.ascSort = this.descSort = this.noSort = 'inactive';

        switch (this.direction) {
            case 1:
                // show the icon
                this.ascSort = 'active';
                // set the sort direction to the next one
                this.direction = -1;
                break;
            case -1:
                this.descSort = 'active';
                this.direction = 0;
                break;
            case 0:
                this.noSort = 'active';
                this.direction = 1;
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
                    direction: this.direction
                },
                bubbles: true
            })
        );

        // now modify the sort direction and change the icon according
        this.setdirection();
    }

    ngOnDestroy() {
        this._currentNoSortState$.unsubscribe();
    }
}
