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

    summaryData = {
        kpis: {},
        basicColumn: {},
        gradientPie: {}
    };

    currentDateTimeRange$ = new Subscription();

    constructor(
        private _summaryPageService: SummaryPageService,
        private _dateTimeRangeService: DateTimeRangeService
    ) { }

    ngOnInit() {
        /*
            listen to stream, then pass the new emitted value to getSummary observable
        */
        this.currentDateTimeRange$ = this._dateTimeRangeService.currentDateTimeRange
            .subscribe(data => {
                this._getSummary(data);
            });
    }

    private _getSummary(summaryRange) {
        this._summaryPageService
            .getSummary(summaryRange)
            .subscribe(
                /*
                    pass the response data,
                    which will then be used to update
                    dumb child components
                */
                res => this.summaryData = res,
                err => console.error(err)
            );
    }

    ngOnDestroy() {
        // stop listening to streams when component is destroyed
        this.currentDateTimeRange$.unsubscribe();
    }
}
