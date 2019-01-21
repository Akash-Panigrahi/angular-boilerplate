import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { riseUp } from './details-page.animations';
import { DetailsPageService } from './details-page.service';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { DateTimeRangeService } from 'src/app/core/services/date-time-range/date-time-range.service';
import { ActionBarUIState } from '../../components/action-bar/action-bar.ui-state';

@Component({
    selector: 'app-details-page',
    templateUrl: './details-page.component.html',
    styleUrls: ['./details-page.component.scss'],
    animations: [riseUp],
    providers: [DetailsPageService]
})
export class DetailsPageComponent implements OnInit, OnDestroy {

    @HostBinding('@riseUp') riseUp = true;

    clients: any[];
    currentDateTimeRange$ = new Subscription();

    constructor(
        private _detailsPageService: DetailsPageService,
        private _dateTimeRangeService: DateTimeRangeService,
        private _actionBarUiState: ActionBarUIState
    ) { }

    ngOnInit() {
        // this.currentDateTimeRange$ = this._dateTimeRangeService.currentDateTimeRange
        //     .subscribe(data => {
        //         this._getReport(data);
        //     });
    }

    private _getReport(reportRange) {
        this._detailsPageService
            .getReport(reportRange)
            .pipe(delay(3000))
            .subscribe(
                res => {
                    this.clients = res;
                    this._actionBarUiState.changeGettingDataBar('complete');
                },
                err => console.error(err)
            );
    }

    receiveReportTableRequest(reportTableReceive) {
        this.currentDateTimeRange$ = this._dateTimeRangeService.currentDateTimeRange
            .subscribe(data => {
                this._getReport({ ...data, ...reportTableReceive });
            });
    }

    ngOnDestroy() {
        this.currentDateTimeRange$.unsubscribe();
    }
}
