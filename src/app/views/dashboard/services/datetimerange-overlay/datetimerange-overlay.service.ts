import { Injectable, OnDestroy, Injector } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef, OverlayConnectionPosition, ConnectionPositionPair } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DatetimerangeRef } from '../../components/datetimerange/datetimerange-ref';
import { DATETIMERANGE_OVERLAY_DATA } from './datetimerange-overlay.tokens';
import { DatetimerangeOverlayConfig } from '../../interfaces/datetimerange.interface';
import { DatetimerangeComponent } from '../../components/datetimerange/datetimerange.component';

@Injectable()
export class DatetimerangeOverlayService implements OnDestroy {
    private _onDestroy$ = new Subject<void>();

    /** Inject overlay service */
    constructor(private _overlay: Overlay, private _injector: Injector) {}

    open(config: DatetimerangeOverlayConfig): DatetimerangeRef {
        /** Returns an OverlayRef (which is a PortalHost) */
        const overlayRef = this._createConfig(config);

        /** Instantiate remote control */
        const datetimerangeRef = new DatetimerangeRef(overlayRef);

        const overlayComponent = this._attachDatetimerangeContainer(
            overlayRef,
            config,
            datetimerangeRef
        );

        // Pass the instance of the overlay component to the remote control
        datetimerangeRef.componentInstance = overlayComponent;

        /** Subscribe to a stream that emits when the backdrop was clicked */
        overlayRef
            .backdropClick()
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(() => datetimerangeRef.close());

        /** Return remote control */
        return datetimerangeRef;
    }

    private _createConfig(config: DatetimerangeOverlayConfig): OverlayRef {
        /** Returns an OverlayConfig */
        const overlayConfig = this._getOverlayConfig(config);

        /** Returns an OverlayRef */
        return this._overlay.create(overlayConfig);
    }

    private _getOverlayConfig(config: DatetimerangeOverlayConfig): OverlayConfig {

        const positions = [
            new ConnectionPositionPair({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' }),
            new ConnectionPositionPair({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'bottom' })
        ];

        const positionStrategy = this._overlay
            .position()
            .flexibleConnectedTo(config.el)
            .withDefaultOffsetY(12)
            .withPositions(positions)
            .withPush(false)
            ;

        const overlayConfig = new OverlayConfig({
            height: 'auto',
            hasBackdrop: true,
            backdropClass: 'light-backdrop',
            panelClass: 'datetimerange__panel',
            scrollStrategy: this._overlay.scrollStrategies.reposition(),
            positionStrategy
        });

        return overlayConfig;
    }

    private _createInjector(
        config: DatetimerangeOverlayConfig,
        datetimerangeRef: DatetimerangeRef
    ): PortalInjector {
        /** Instantiate new WeakMap for our custom injection tokens */
        const injectionTokens = new WeakMap();

        /** Set custom injection tokens */
        injectionTokens.set(DatetimerangeRef, datetimerangeRef);
        injectionTokens.set(DATETIMERANGE_OVERLAY_DATA, config.data);

        /** Instantiate new PortalInjector */
        return new PortalInjector(this._injector, injectionTokens);
    }

    private _attachDatetimerangeContainer(
        overlayRef: OverlayRef,
        config: DatetimerangeOverlayConfig,
        datetimerangeRef: DatetimerangeRef
    ) {
        const injector = this._createInjector(config, datetimerangeRef);

        /** Create ComponentPortal that can be attached to a PortalHost */
        const containerPortal = new ComponentPortal(DatetimerangeComponent, null, injector);

        /** Attach ComponentPortal to PortalHost */
        const containerRef = overlayRef.attach(containerPortal);

        return containerRef.instance;
    }

    ngOnDestroy(): void {
        this._onDestroy$.next();
    }
}
