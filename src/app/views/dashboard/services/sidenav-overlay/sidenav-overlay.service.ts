import { Injectable, OnDestroy, Injector } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { SidenavOverlayComponent } from '../../components/sidenav-overlay/sidenav-overlay.component';
import { SidenavOverlayRef } from '../../class/sidenav-overlay-ref';
import { SIDENAV_OVERLAY_DATA } from './sidenav-overlay.tokens';
import { SidenavConfig } from '../../interfaces/sidenav.interface';

@Injectable()
export class SidenavOverlayService implements OnDestroy {
    private _onDestroy$ = new Subject<void>();

    /** Inject overlay service */
    constructor(private _overlay: Overlay, private _injector: Injector) {}

    open(config: SidenavConfig): SidenavOverlayRef {
        /** Returns an OverlayRef (which is a PortalHost) */
        const overlayRef = this._createConfig(config);

        /** Instantiate remote control */
        const sidenavOverlayRef = new SidenavOverlayRef(overlayRef);

        const overlayComponent = this._attachSidenavContainer(
            overlayRef,
            config,
            sidenavOverlayRef
        );

        // Pass the instance of the overlay component to the remote control
        sidenavOverlayRef.componentInstance = overlayComponent;

        /** Subscribe to a stream that emits when the backdrop was clicked */
        overlayRef
            .backdropClick()
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(() => sidenavOverlayRef.close());

        /** Return remote control */
        return sidenavOverlayRef;
    }

    private _createConfig(config: SidenavConfig): OverlayRef {
        /** Returns an OverlayConfig */
        const overlayConfig = this._getOverlayConfig(config);

        /** Returns an OverlayRef */
        return this._overlay.create(overlayConfig);
    }

    private _getOverlayConfig(config: SidenavConfig): OverlayConfig {
        const positionStrategy = this._overlay
            .position()
            .global()
            .left()
            .top();

        const overlayConfig = new OverlayConfig({
            height: '100%',
            hasBackdrop: true,
            backdropClass: 'dark-backdrop',
            panelClass: 'sidenav-overlay__panel',
            scrollStrategy: this._overlay.scrollStrategies.block(),
            positionStrategy
        });

        return overlayConfig;
    }

    private _createInjector(
        config: SidenavConfig,
        sidenavOverlayRef: SidenavOverlayRef
    ): PortalInjector {
        /** Instantiate new WeakMap for our custom injection tokens */
        const injectionTokens = new WeakMap();

        /** Set custom injection tokens */
        injectionTokens.set(SidenavOverlayRef, sidenavOverlayRef);
        injectionTokens.set(SIDENAV_OVERLAY_DATA, config.data);

        /** Instantiate new PortalInjector */
        return new PortalInjector(this._injector, injectionTokens);
    }

    private _attachSidenavContainer(
        overlayRef: OverlayRef,
        config: SidenavConfig,
        sidenavOverlayRef: SidenavOverlayRef
    ) {
        const injector = this._createInjector(config, sidenavOverlayRef);

        /** Create ComponentPortal that can be attached to a PortalHost */
        const containerPortal = new ComponentPortal(SidenavOverlayComponent, null, injector);

        /** Attach ComponentPortal to PortalHost */
        const containerRef = overlayRef.attach(containerPortal);

        return containerRef.instance;
    }

    ngOnDestroy(): void {
        this._onDestroy$.next();
    }
}
