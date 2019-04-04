import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { detailsPageAnimation } from './details-page.animations';
import { DetailsPageService } from './details-page.service';
import { Subject } from 'rxjs';
import { ActionBarUIState } from '../../components/action-bar/action-bar.ui-state';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { take, delay, takeUntil, tap } from 'rxjs/operators';
import { DateTimeRangeService } from '../../services/date-time-range/date-time-range.service';
import { DateTimeRange } from 'src/app/views/dashboard/interfaces/date-time-range.interface';
import { DetailsGridRequest, DetailsGridResponse } from 'src/app/views/dashboard/interfaces/details-grid.interfaces';
import { DetailsGridRequestService } from '../../services/details-grid-request/details-grid-request.service';

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

    private _onDestroy$ = new Subject<void>();

    constructor(
        private _detailsPageService: DetailsPageService,
        private _dateTimeRangeService: DateTimeRangeService,
        private _detailsGridRequestService: DetailsGridRequestService,
        private _actionBarUiState: ActionBarUIState,
        private _storage: StorageService
    ) { }

    ngOnInit(): void {

        this._storage
            .getItem('details-grid-request')
            .pipe(takeUntil(this._onDestroy$))
            .subscribe((detailsGridRequestData: DetailsGridRequest) => {
                this.detailsGridRequest = detailsGridRequestData;
            });

        /**
         * if user in session
         * i.e., there is data in storage
         */
        if (!this.detailsGridRequest) {
            // initial state saving
            const initialState = this._detailsGridRequestService.initial();

            this._storage.setItem('details-grid-request', initialState);
            this.detailsGridRequest = initialState;
        }

        this._dateTimeRangeService
            .currentDateTimeRange()
            .pipe(takeUntil(this._onDestroy$))
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
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(
                (res: DetailsGridResponse[]) => {
                    this.details = res;
                    this._actionBarUiState.changeGettingDataBar('complete');
                },
                err => console.error(err)
            );
    }

    onDetailsGridRequest(detailsGridRequest: DetailsGridRequest): void {

        // save state
        this._storage.setItem('details-grid-request', detailsGridRequest);

        this._dateTimeRangeService
            .currentDateTimeRange()
            .pipe(takeUntil(this._onDestroy$))
            .subscribe((dateTimeRange: DateTimeRange) => {
                this._getDetails(dateTimeRange, detailsGridRequest);
            });
    }

    onDownloadDetails(detailsGridRequest: DetailsGridRequest): void {

        let fromDate: string, fromTime: string, toDate: string, toTime: string;

        this._storage
            .getItem('date-time-range')
            .pipe(takeUntil(this._onDestroy$))
            .subscribe((dateTimeRangeData: DateTimeRange) => {
                fromDate = dateTimeRangeData.fromDate;
                fromTime = dateTimeRangeData.fromTime;
                toDate = dateTimeRangeData.toDate;
                toTime = dateTimeRangeData.toTime;
            });

        const { search, sort } = detailsGridRequest;

        /* to disable max 140 characters for a line rule */
        // tslint:disable-next-line
        const query = `?fromDate=${fromDate}&fromTime=${fromTime}&toDate=${toDate}&toTime=${toTime}&search=${search}&sort=${JSON.stringify(sort)}`;

        this._detailsPageService.downloadDetails(query);
    }

    ngOnDestroy(): void {
        this._onDestroy$.next();
    }
}
