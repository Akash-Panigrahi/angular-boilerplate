import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { riseUp } from './details-page.animations';
import { DetailsPageService } from './details-page.service';
import { Subscription } from 'rxjs';
import { DateTimeRangeService } from 'src/app/core/services/date-time-range/date-time-range.service';
import { ActionBarUIState } from '../../components/action-bar/action-bar.ui-state';
import { StateService } from 'src/app/core/services/state/state.service';
import { take, delay } from 'rxjs/operators';
import { IReportTableRequest, IReportTableData } from 'src/app/core/interfaces/report-table.interface';

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

    clients: IReportTableData[];
    currentDateTimeRange$ = new Subscription();

    constructor(
        private _detailsPageService: DetailsPageService,
        private _dateTimeRangeService: DateTimeRangeService,
        private _actionBarUiState: ActionBarUIState,
        private _state: StateService
    ) { }

    ngOnInit(): void {

        this._state.setState('report-table-request', {
            start: 0,
            length: 5,
            search: '',
            sort: {
                sortKey: 'id',
                sortDir: 0
            }
        });

        this.currentDateTimeRange$ = this._dateTimeRangeService.currentDateTimeRange
            .subscribe(reportRange => {
                this._getReport(reportRange, this._state.getState('report-table-request'));
            });
    }

    private _getReport(reportRange, reportTableRequest: IReportTableRequest): void {

        const reportRequest = { ...reportRange, ...reportTableRequest };

        this._detailsPageService
            .getReport(reportRequest)
            // .pipe(delay(3000))
            .subscribe(
                (res: IReportTableData[]) => {
                    this.clients = res;
                    this._actionBarUiState.changeGettingDataBar('complete');
                },
                err => console.error(err)
            );
    }

    receiveReportTableRequest(reportTableRequest: IReportTableRequest): void {
        this._dateTimeRangeService.currentDateTimeRange
            .pipe(take(1))
            .subscribe(reportRange => {
                this._getReport(reportRange, reportTableRequest);
            });
    }

    ngOnDestroy(): void {
        this.currentDateTimeRange$.unsubscribe();
    }
}
