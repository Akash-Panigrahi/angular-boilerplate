import { Component, OnInit, HostListener, EventEmitter, Inject, OnDestroy } from '@angular/core';
import { AnimationEvent } from '@angular/animations';

import { slideDownRangesAnimation } from './datetimerange.animations';
import { DatetimerangeRef } from './datetimerange-ref';
import { DATETIMERANGE_OVERLAY_DATA } from '../../services/datetimerange-overlay/datetimerange-overlay.tokens';
import { DatetimerangeData, MomentRange } from '../../interfaces/datetimerange.interface';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-datetimerange',
    templateUrl: './datetimerange.component.html',
    styleUrls: ['./datetimerange.component.scss'],
    animations: [slideDownRangesAnimation]
})
export class DatetimerangeComponent implements OnInit, OnDestroy {

    // property required to trigger animation/*  */
    isDateTimeRangeOpen = true;

    activeRange: string;

    dateTime: MomentRange;
    pickerDateTime: MomentRange;

    dateTime$ = new Subject<MomentRange>();

    slideDownRangesAnimationEvent = new EventEmitter<AnimationEvent>();

    onSlideDownRangesAnimation(event) {
        this.slideDownRangesAnimationEvent.emit(event);
    }

    @HostListener('document:keydown', ['$event'])
    private _onKeydown(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            this._datetimerangeRef.close();
        }
    }

    startExitAnimation() {
        this.isDateTimeRangeOpen = false;
    }

    constructor(
        private _datetimerangeRef: DatetimerangeRef,
        @Inject(DATETIMERANGE_OVERLAY_DATA) public datetimerangeData: DatetimerangeData
    ) {}

    ngOnInit() {
        for (const [rangeLabel, rangeValue] of this.datetimerangeData.ranges) {
            if (this._dateTimeRangeIsSame(this.datetimerangeData.dateTimeRange, rangeValue)) {
                this.activeRange = rangeLabel;
            }
        }

        /**
         * if activeRange is not selected,
         * then it is not from the predefined ones
         */
        if (!this.activeRange) {
            this.activeRange = 'Custom';
        }

        this.pickerDateTime = this.datetimerangeData.dateTimeRange;
    }

    orderByIndex(next: string, curr: string): string {
        return curr;
    }

    changeRange(rangeLabel: string, rangeValue: MomentRange): void {
        this.activeRange = rangeLabel;

        /**
         * if rangeValue is null, that means 'Custom' range is selected
         */
        if (rangeValue) {
            if (!this._canSetNewDateTime(rangeValue)) {
                return;
            }

            // statically set picker date time range
            this.pickerDateTime = this.dateTime;

            this.dateTime$.next(rangeValue);
            this._datetimerangeRef.close();
        }
    }

    onPickerClosed(e) {
        // console.log(e);
    }

    onDateTimeChange(dateTime: MomentRange): void {
        if (!this._canSetNewDateTime(dateTime)) {
            return;
        }

        this.dateTime$.next(dateTime);
        this._datetimerangeRef.close();
    }

    private _canSetNewDateTime(dateTimeRange: MomentRange): boolean {
        /**
         * if component has just opened, then dateTime value will be undefined
         * if dateTime is set, means user has already clicked on atleast one range
         * then check whether user has clicked already selected value
         */
        if (this.dateTime && this._dateTimeRangeIsSame(this.dateTime, dateTimeRange)) {
            return false;
        }

        // set new dateTime
        this.dateTime = dateTimeRange;

        return true;
    }

    private _dateTimeRangeIsSame(firstDateTimeRange: MomentRange, secondDateTimeRange: MomentRange): boolean {
        if (
            firstDateTimeRange[0].format() === secondDateTimeRange[0].format() &&
            firstDateTimeRange[1].format() === secondDateTimeRange[1].format()
        ) {
            return true;
        }

        return false;
    }

    ngOnDestroy() {
        this.dateTime$.complete();
    }
}
