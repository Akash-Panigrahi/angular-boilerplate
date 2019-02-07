import { Component, OnInit, OnDestroy } from '@angular/core';
import { IHeaderAngularComp } from 'ag-grid-angular';
import { IHeaderParams } from 'ag-grid-community';
import { NoSortStateService } from './no-sort-state.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-ag-grid-header',
    templateUrl: './ag-grid-header.component.html',
    styleUrls: ['./ag-grid-header.component.scss'],
})
export class AgGridHeaderComponent implements IHeaderAngularComp, OnInit, OnDestroy {

    private _currentNoSortState$ = new Subscription();

    params: any;
    ascSort: any;
    descSort: any;
    noSort: any;

    // initial sorting direction
    sortDir = 0;

    constructor(
        private _noSortState: NoSortStateService
    ) { }

    ngOnInit() {
        /*
            listen to events for skipping the specified
            header component
            and reset all components to no sort state
        */
        this._currentNoSortState$ = this._noSortState
            .currentNoSortState
            .subscribe(columnToSkip => {
                if (this.params.column.colId !== columnToSkip) {
                    this.sortDir = 0;
                    this.setSortDirection();
                }
            });
    }

    agInit(params: IHeaderParams) {
        this.params = params;
        this.setSortDirection();
    }

    setSortDirection(): void {

        // hide all sort icons
        this.ascSort = this.descSort = this.noSort = 'inactive';

        switch (this.sortDir) {
            case 1:
                // show the icon
                this.ascSort = 'active';
                // set the sort direction to the next one
                this.sortDir = -1;
                break;
            case -1:
                this.descSort = 'active';
                this.sortDir = 0;
                break;
            case 0:
                this.noSort = 'active';
                this.sortDir = 1;
                break;
        }
    }

    onHeaderClick(target: HTMLElement, colId: string): void {

        // change sort directions of all sibling header components to 0
        this._noSortState.changeNoSortState(colId);

        // dispatch the custom click event with the specified data
        target.dispatchEvent(
            new CustomEvent('reportTableSortChangeEvent', {
                detail: {
                    sortKey: colId,
                    sortDir: this.sortDir
                },
                bubbles: true
            })
        );

        // now modify the sort direction and change the icon according
        this.setSortDirection();
    }

    ngOnDestroy() {
        this._currentNoSortState$.unsubscribe();
    }
}
