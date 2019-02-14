import { Component, OnInit, HostBinding, OnDestroy, Input } from '@angular/core';
import { detailsPageAnimation } from './details-page.animations';
import { DetailsPageService } from './details-page.service';
import { Subscription } from 'rxjs';
import { DateTimeRangeService } from 'src/app/core/services/date-time-range/date-time-range.service';
import { ActionBarUIState } from '../../components/action-bar/action-bar.ui-state';
import { StateService } from 'src/app/core/services/state/state.service';
import { take, delay } from 'rxjs/operators';
import { IDetailsTableRequest, IDetailsTableResponse } from 'src/app/core/interfaces/details-table.interface';

@Component({
    selector: 'app-details-page',
    templateUrl: './details-page.component.html',
    styleUrls: ['./details-page.component.scss'],
    animations: [detailsPageAnimation],
    providers: [DetailsPageService]
})
export class DetailsPageComponent implements OnInit, OnDestroy {

    @HostBinding('@detailsPageAnimation') detailsPageAnimation = true;

    details: IDetailsTableResponse[];
    currentDateTimeRange$ = new Subscription();

    detailsTableRequest = {
        start: 0,
        length: 5,
        search: '',
        sort: {
            sortKey: 'id',
            sortDir: 0
        }
    };

    constructor(
        private _detailsPageService: DetailsPageService,
        private _dateTimeRangeService: DateTimeRangeService,
        private _actionBarUiState: ActionBarUIState,
        private _state: StateService
    ) { }

    ngOnInit(): void {

        const detailsTableRequestFromState = this._state.getState('details-table-request');
        /**
         * if user in session
         * i.e., there is data in storage
         */
        if (!detailsTableRequestFromState) {
            // initial state saving
            this._state.setState('details-table-request', this.detailsTableRequest);
        } else {
            this.detailsTableRequest = detailsTableRequestFromState;
        }

        this.currentDateTimeRange$ = this._dateTimeRangeService.currentDateTimeRange()
            .subscribe(dateTimeRange => {
                this._getDetails(dateTimeRange, this._state.getState('details-table-request'));
            });
    }

    private _getDetails(dateTimeRange, detailsTableRequest: IDetailsTableRequest): void {

        const detailsRequest = { ...dateTimeRange, ...detailsTableRequest };

        this._detailsPageService
            .getDetails(detailsRequest)
            // .pipe(delay(3000))
            .subscribe(
                (res: IDetailsTableResponse[]) => {
                    this.details = res;
                    this._actionBarUiState.changeGettingDataBar('complete');
                },
                err => console.error(err)
            );
    }

    onDetailsTableRequest(detailsTableRequest: IDetailsTableRequest): void {

        // save state
        this._state.setState('details-table-request', detailsTableRequest);

        this._dateTimeRangeService.currentDateTimeRange()
            .pipe(take(1))
            .subscribe(dateTimeRange => {
                this._getDetails(dateTimeRange, detailsTableRequest);
            });
    }

    onDownloadDetails(detailsTableRequest: IDetailsTableRequest): void {

        const { startDate, startTime, endDate, endTime } = this._state.getState('date-time-range');
        const { start, length, search, sort } = detailsTableRequest;

        /* to disable max 140 characters for a line rule */
        // tslint:disable-next-line
        const query = `?startDate=${startDate}&startTime=${startTime}&endDate=${endDate}&endTime=${endTime}&start=${start}&length=${length}&search=${search}&sort=${sort}`;

        this._detailsPageService.downloadDetails(query);
    }

    ngOnDestroy(): void {
        this.currentDateTimeRange$.unsubscribe();
    }
}
