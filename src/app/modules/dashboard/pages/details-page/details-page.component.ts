import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { riseUp } from './details-page.animations';
import { DetailsPageService } from './details-page.service';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { DateTimeRangeService } from 'src/app/core/services/date-time-range/date-time-range.service';

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
        private _dateTimeRangeService: DateTimeRangeService
    ) { }

    ngOnInit() {
        this.currentDateTimeRange$ = this._dateTimeRangeService.currentDateTimeRange
            .subscribe(data => {
                this._getReport(data);
            });
    }

    private _getReport(reportRange) {
        this._detailsPageService
            .getReport(reportRange)
            .subscribe(
                res => this.clients = res,
                err => console.error(err)
            );
    }

    ngOnDestroy() {
        this.currentDateTimeRange$.unsubscribe();
    }
}
