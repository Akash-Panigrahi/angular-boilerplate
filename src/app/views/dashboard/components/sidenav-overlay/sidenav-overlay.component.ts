import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { LogoutService } from '../../services/logout/logout.service';
import { SidenavOverlayRef } from '../../class/sidenav-overlay-ref';
import { SIDENAV_OVERLAY_DATA } from '../../services/sidenav-overlay/sidenav-overlay.tokens';
import { SidenavData } from '../../interfaces/sidenav.interface';

@Component({
  selector: 'app-sidenav-overlay',
  templateUrl: './sidenav-overlay.component.html',
  styleUrls: ['./sidenav-overlay.component.scss']
})
export class SidenavOverlayComponent implements OnInit {

    activeRouteUrl: string;

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
