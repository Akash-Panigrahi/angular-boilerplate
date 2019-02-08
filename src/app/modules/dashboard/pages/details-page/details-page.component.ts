import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { riseUp } from './details-page.animations';
import { DetailsPageService } from './details-page.service';
import { Subscription } from 'rxjs';
import { DateTimeRangeService } from 'src/app/core/services/date-time-range/date-time-range.service';
import { ActionBarUIState } from '../../components/action-bar/action-bar.ui-state';
import { StateService } from 'src/app/core/services/state/state.service';
import { take, delay } from 'rxjs/operators';
import { IDetailsTableRequest } from 'src/app/core/interfaces/details-table.interface';

@Component({
    selector: 'app-details-page',
    templateUrl: './details-page.component.html',
    styleUrls: ['./details-page.component.scss'],
    animations: [riseUp],
    providers: [DetailsPageService]
})
export class DetailsPageComponent implements OnInit, OnDestroy {

    @HostBinding('@riseUp')
    private _riseUp = true;

    details: IDetailsTableRequest[];
    currentDateTimeRange$ = new Subscription();

    constructor(
        private _detailsPageService: DetailsPageService,
        private _dateTimeRangeService: DateTimeRangeService,
        private _actionBarUiState: ActionBarUIState,
        private _state: StateService
    ) { }

    ngOnInit(): void {

        this._state.setState('details-table-request', {
            start: 0,
            length: 5,
            search: '',
            sort: {
                sortKey: 'id',
                sortDir: 0
            }
        });

        this.currentDateTimeRange$ = this._dateTimeRangeService.currentDateTimeRange
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
                (res: IDetailsTableRequest[]) => {
                    this.details = res;
                    this._actionBarUiState.changeGettingDataBar('complete');
                },
                err => console.error(err)
            );
    }

    receiveDetailsTableRequest(detailsTableRequest: IDetailsTableRequest): void {
        this._dateTimeRangeService.currentDateTimeRange
            .pipe(take(1))
            .subscribe(dateTimeRange => {
                this._getDetails(dateTimeRange, detailsTableRequest);
            });
    }

    ngOnDestroy(): void {
        this.currentDateTimeRange$.unsubscribe();
    }
}
