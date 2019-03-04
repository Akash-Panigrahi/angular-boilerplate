import { Component, OnInit, Inject } from '@angular/core';

import { LogoutService } from '../../services/logout/logout.service';
import { SidenavOverlayRef } from '../../class/sidenav-overlay-ref';
import { SIDENAV_OVERLAY_DATA } from '../../services/sidenav-overlay/sidenav-overlay.tokens';
import { SidenavData } from '../../interfaces/sidenav.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav-overlay',
  templateUrl: './sidenav-overlay.component.html',
  styleUrls: ['./sidenav-overlay.component.scss']
})
export class SidenavOverlayComponent implements OnInit {

    constructor(
        private _logout: LogoutService,
        private _router: Router,
        private _sidenavOverlayRef: SidenavOverlayRef,
        @Inject(SIDENAV_OVERLAY_DATA) public sidenavData: SidenavData
    ) {}

    ngOnInit() {}

    changeRoute(routeUrl) {
        this._sidenavOverlayRef.close();
        this._router.navigateByUrl(routeUrl);
    }

    logout() {
        this._sidenavOverlayRef.close();
        this._logout.logout();
    }
}
