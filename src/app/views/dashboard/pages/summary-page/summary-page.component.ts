import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { summaryPageAnimation } from './summary-page.animations';
import { SummaryPageService } from './summary-page.service';
import { Subscription, Subject } from 'rxjs';
import { ActionBarUIState } from '../../components/action-bar/action-bar.ui-state';
import { DateTimeRangeService } from '../../services/date-time-range/date-time-range.service';
import { CacheService } from '../../services/cache/cache.service';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-summary-page',
    templateUrl: './summary-page.component.html',
    styleUrls: ['./summary-page.component.scss'],
    animations: [summaryPageAnimation],
    providers: [SummaryPageService]
})
export class SummaryPageComponent implements OnInit, OnDestroy {

    @HostBinding('@summaryPageAnimation')
    private _summaryPageAnimation = true;

    summaryData = {
        kpis: null,
        basicColumn: null,
        gradientPie: null
    };

    private _onDestroy$ = new Subject<void>();

    constructor(
        private _summaryPageService: SummaryPageService,
        private _dateTimeRangeService: DateTimeRangeService,
        private _actionBarUiState: ActionBarUIState
    ) { }

    ngOnInit() {
        /*
            listen to stream, then pass the new emitted value to getSummary observable
        */
        this._dateTimeRangeService
            .currentDateTimeRange()
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(data => {

                // check if data is present in cacheservice
                const cachedData = CacheService.get('summary', data);

                if (cachedData) {
                    this.summaryData = cachedData;
                    this._actionBarUiState.changeGettingDataBar('complete');
                } else {
                    this._getSummary(data);
                }
            });
    }

    private _getSummary(summaryRange): void {
        this._summaryPageService
            .getSummary(summaryRange)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(
                /*
                    pass the response data,
                    which will then be used to update
                    dumb child components
                */
                res => {
                    this.summaryData = res;

                    // set data in cacheservice
                    CacheService.set('summary', summaryRange, res);

                    this._actionBarUiState.changeGettingDataBar('complete');
                },
                err => console.error(err)
            );
    }

    ngOnDestroy() {
        // stop listening to streams when component is destroyed
        this._onDestroy$.next();
    }
}
