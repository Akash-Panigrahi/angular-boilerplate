import { Component, OnInit, HostListener, EventEmitter } from '@angular/core';
import { AnimationEvent } from '@angular/animations';

import { slideDownRangesAnimation } from './datetimerange.animations';
import { DatetimerangeRef } from './datetimerange-ref';

declare const moment;

@Component({
    selector: 'app-datetimerange',
    templateUrl: './datetimerange.component.html',
    styleUrls: ['./datetimerange.component.scss'],
    animations: [slideDownRangesAnimation]
})
export class DatetimerangeComponent implements OnInit {

    // property required to trigger animation
    isDateTimeRangeOpen = true;

    activeRange: string;

    ranges = new Map([
        ['Today', [
            moment(), moment()
        ]],
        ['Yesterday', [
            moment().subtract(1, 'days'), moment().subtract(1, 'days')
        ]],
        ['Last 7 Days', [
            moment().subtract(6, 'days'), moment()
        ]],
        ['Last 30 Days', [
            moment().subtract(29, 'days'), moment()
        ]],
        ['This Month', [
            moment().startOf('month'), moment().endOf('month')
        ]],
        ['Last Month', [
            moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')
        ]],
        ['Last Year', [
            moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')
        ]],
    ]);

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
        private _datetimerangeRef: DatetimerangeRef
    ) {}

    ngOnInit() {}

    orderByIndex(next, curr) {
        return curr;
    }

    changeRange(range: string): void {
        this.activeRange = range;
    }
}
