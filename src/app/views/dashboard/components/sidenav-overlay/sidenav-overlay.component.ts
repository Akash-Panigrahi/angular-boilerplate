import { Component, OnInit, Inject, HostListener, HostBinding, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationEvent } from '@angular/animations';

import { LogoutService } from '../../services/logout/logout.service';
import { SidenavOverlayRef } from '../../class/sidenav-overlay-ref';
import { SIDENAV_OVERLAY_DATA } from '../../services/sidenav-overlay/sidenav-overlay.tokens';
import { SidenavData } from '../../interfaces/sidenav.interface';
import { sidenavOverlayAnimation } from './sidenav-overlay.animations';


@Component({
  selector: 'app-sidenav-overlay',
  templateUrl: './sidenav-overlay.component.html',
  styleUrls: ['./sidenav-overlay.component.scss'],
  animations: [sidenavOverlayAnimation]
})
export class SidenavOverlayComponent implements OnInit {

    activeRouteUrl: string;

    sidenavOverlayAnimationEvent = new EventEmitter<AnimationEvent>();

    @HostBinding('@sidenavOverlayAnimation')
    private _sidenavOverlayAnimation = '';

    @HostListener('@sidenavOverlayAnimation.start', ['$event'])
    private _onSidenavOverlayAnimationStart(event) {
        this.sidenavOverlayAnimationEvent.emit(event);
    }

    @HostListener('@sidenavOverlayAnimation.done', ['$event'])
    private _onSidenavOverlayAnimationDone(event) {
        this.sidenavOverlayAnimationEvent.emit(event);
    }

    @HostListener('document:keydown', ['$event'])
    private _onKeydown(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            this._sidenavOverlayRef.close();
        }
    }

    startExitAnimation() {
        this._sidenavOverlayAnimation = 'void';
    }

    constructor(
        private _logout: LogoutService,
        private _router: Router,
        private _sidenavOverlayRef: SidenavOverlayRef,
        @Inject(SIDENAV_OVERLAY_DATA) public sidenavData: SidenavData
    ) {}

    ngOnInit() {
        /** current route url to style active route in template */
        this.activeRouteUrl = this._router.url;
    }

    changeRoute(routeUrl) {
        this._sidenavOverlayRef.close();
        this._router.navigateByUrl(routeUrl);
    }

    logout() {
        this._sidenavOverlayRef.close();
        this._logout.logout();
    }
}
