import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { detailsPageAnimation } from './details-page.animations';
import { DetailsPageService } from './details-page.service';
import { Subject } from 'rxjs';
import { ActionBarUIState } from '../../components/action-bar/action-bar.ui-state';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { take, delay, takeUntil, tap, takeWhile } from 'rxjs/operators';
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

    private _destroy$ = new Subject();

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
            .pipe(takeWhile(value => !!value))
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
            .pipe(takeUntil(this._destroy$))
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
            .pipe(takeUntil(this._destroy$))
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
        this._storage.setItem('details-grid-request', detailsGridRequest);

        this._dateTimeRangeService
            .currentDateTimeRange()
            .pipe(take(1))
            .pipe(takeUntil(this._destroy$))
            .subscribe((dateTimeRange: DateTimeRange) => {
                this._getDetails(dateTimeRange, detailsGridRequest);
            });
    }

    onDownloadDetails(detailsGridRequest: DetailsGridRequest): void {

        let startDate: string, startTime: string, endDate: string, endTime: string;

        this._storage
            .getItem('date-time-range')
            .pipe(takeWhile(value => !!value))
            .subscribe((dateTimeRangeData: DateTimeRange) => {
                 startDate = dateTimeRangeData.startDate;
                 startTime = dateTimeRangeData.startTime;
                 endDate = dateTimeRangeData.endDate;
                 endTime = dateTimeRangeData.endTime;
            });

        const { start, length, search, sort } = detailsGridRequest;

        /* to disable max 140 characters for a line rule */
        // tslint:disable-next-line
        const query = `?startDate=${startDate}&startTime=${startTime}&endDate=${endDate}&endTime=${endTime}&start=${start}&length=${length}&search=${search}&sort=${sort}`;

        this._detailsPageService.downloadDetails(query);
    }

    ngOnDestroy(): void {
        this._destroy$.next(true);
    }
}
