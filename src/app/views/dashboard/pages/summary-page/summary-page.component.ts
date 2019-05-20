import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { summaryPageAnimation } from './summary-page.animations';
import { SummaryPageService } from './summary-page.service';
import { Subject } from 'rxjs';
import { ActionBarUIState } from '../../components/action-bar/action-bar.ui-state';
import { DateTimeRangeService } from '../../storage-services/date-time-range/date-time-range.service';
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
                this._getSummary(data);
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
