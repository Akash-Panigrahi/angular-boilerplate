import { OverlayRef } from '@angular/cdk/overlay';
import { Subject, Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';

import { DatetimerangeComponent } from './datetimerange.component';


export class DatetimerangeRef {
    componentInstance: DatetimerangeComponent;

    private _beforeClose = new Subject<void>();
    private _afterClosed = new Subject<void>();

    constructor(private _overlayRef: OverlayRef) {}

    close(): void {
        // Listen for animation 'start' events
        this.componentInstance.slideDownRangesAnimationEvent
            .pipe(
                filter(event => event.phaseName === 'start'),
                take(1)
            )
            .subscribe(() => {
                this._beforeClose.next();
                this._beforeClose.complete();
                this._overlayRef.detachBackdrop();
            });

        // Listen for animation 'done' events
        this.componentInstance.slideDownRangesAnimationEvent
            .pipe(
                filter(event => event.phaseName === 'done' && event.toState === 'close'),
                take(1)
            )
            .subscribe(() => {
                this._overlayRef.dispose();
                this._afterClosed.next();
                this._afterClosed.complete();

                // Make sure to also clear the reference to the
                // component instance to avoid memory leaks
                this.componentInstance = null;
            });

        // Start exit animation
        this.componentInstance.startExitAnimation();
    }

    beforeClose(): Observable<void> {
        return this._beforeClose.asObservable();
    }

    afterClosed(): Observable<void> {
        return this._afterClosed.asObservable();
    }
}
