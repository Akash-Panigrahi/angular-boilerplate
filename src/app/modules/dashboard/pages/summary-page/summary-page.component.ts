import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { riseUp } from './summary-page.animations';
import { SummaryPageService } from './summary-page.service';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { DateTimeRangeService } from 'src/app/core/services/date-time-range/date-time-range.service';

@Component({
    selector: 'app-summary-page',
    templateUrl: './summary-page.component.html',
    styleUrls: ['./summary-page.component.scss'],
    animations: [riseUp],
    providers: [SummaryPageService]
})
export class SummaryPageComponent implements OnInit, OnDestroy {

    @HostBinding('@riseUp') riseUp = true;

    summaryData = {};
    currentDateTimeRange$ = new Subscription();

    constructor(
        private _summaryPageService: SummaryPageService,
        private _dateTimeRangeService: DateTimeRangeService
    ) { }

    ngOnInit() {
        this.currentDateTimeRange$ = this._dateTimeRangeService.currentDateTimeRange
            .subscribe(data => {
                this._getSummary(data);
            });

        this._dateTimeRangeService.changeDateTimeRange(JSON.parse(localStorage.getItem('date-time-range')));
    }

    private _getSummary(summaryRange) {
        this._summaryPageService
            .getSummary(summaryRange)
            .pipe(take(1))
            .subscribe(
                res => this.summaryData = res,
                err => console.error(err)
            );
    }

    ngOnDestroy() {
        this.currentDateTimeRange$.unsubscribe();
    }
}
