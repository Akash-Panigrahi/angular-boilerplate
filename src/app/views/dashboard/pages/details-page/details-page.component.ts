import { Component, OnInit, HostBinding, OnDestroy, Input } from '@angular/core';
import { detailsPageAnimation } from './details-page.animations';
import { DetailsPageService } from './details-page.service';
import { Subscription } from 'rxjs';
import { ActionBarUIState } from '../../components/action-bar/action-bar.ui-state';
import { StateService } from 'src/app/core/services/state/state.service';
import { take, delay } from 'rxjs/operators';
import { DateTimeRangeService } from '../../services/date-time-range/date-time-range.service';
import { DateTimeRange } from 'src/app/views/dashboard/interfaces/date-time-range.interface';
import { DetailsGridRequest, DetailsGridResponse } from 'src/app/views/dashboard/interfaces/details-grid.interfaces';

@Component({
    selector: 'app-details-page',
    templateUrl: './details-page.component.html',
    styleUrls: ['./details-page.component.scss'],
    animations: [detailsPageAnimation],
    providers: [DetailsPageService]
})
export class DetailsPageComponent implements OnInit, OnDestroy {

    @HostBinding('@detailsPageAnimation')
    private _detailsPageAnimation = true;

    details: DetailsGridResponse[];
    detailsGridRequest: DetailsGridRequest;

    currentDateTimeRange$ = new Subscription();

    initialDetailsGridRequest = {
        start: 0,
        length: 5,
        search: '',
        sort: {
            key: 'id',
            direction: 0
        }
    };

    constructor(
        private _detailsPageService: DetailsPageService,
        private _dateTimeRangeService: DateTimeRangeService,
        private _actionBarUiState: ActionBarUIState,
        private _state: StateService
    ) { }

    ngOnInit(): void {

        const detailsGridRequestFromState = this._state.get('details-grid-request');
        /**
         * if user in session
         * i.e., there is data in storage
         */
        if (detailsGridRequestFromState) {
            this.detailsGridRequest = detailsGridRequestFromState;
        } else {
            // initial state saving
            this._state.set('details-grid-request', this.initialDetailsGridRequest);
            this.detailsGridRequest = this.initialDetailsGridRequest;
        }

        this.currentDateTimeRange$ = this._dateTimeRangeService.currentDateTimeRange()
            .subscribe((dateTimeRange: DateTimeRange) => {
                this._getDetails(dateTimeRange, this.detailsGridRequest);
            });
    }

    private _getDetails(
        dateTimeRange: DateTimeRange,
        detailsGridRequest: DetailsGridRequest): void {

        const detailsRequest = { ...dateTimeRange, ...detailsGridRequest };

        this._detailsPageService
            .getDetails(detailsRequest)
            // .pipe(delay(3000))
            .subscribe(
                (res: DetailsGridResponse[]) => {
                    this.details = res;
                    this._actionBarUiState.changeGettingDataBar('complete');
                },
                err => console.error(err)
            );
    }

    onDetailsGridRequest(
        detailsGridRequest: DetailsGridRequest): void {

        // save state
        this._state.set('details-grid-request', detailsGridRequest);

        this._dateTimeRangeService.currentDateTimeRange()
            .pipe(take(1))
            .subscribe((dateTimeRange: DateTimeRange) => {
                this._getDetails(dateTimeRange, detailsGridRequest);
            });
    }

    onDownloadDetails(
        detailsGridRequest: DetailsGridRequest): void {

        const { startDate, startTime, endDate, endTime } = this._state.get('date-time-range');
        const { start, length, search, sort } = detailsGridRequest;

        /* to disable max 140 characters for a line rule */
        // tslint:disable-next-line
        const query = `?startDate=${startDate}&startTime=${startTime}&endDate=${endDate}&endTime=${endTime}&start=${start}&length=${length}&search=${search}&sort=${sort}`;

        this._detailsPageService.downloadDetails(query);
    }

    ngOnDestroy(): void {
        this.currentDateTimeRange$.unsubscribe();
    }
}
