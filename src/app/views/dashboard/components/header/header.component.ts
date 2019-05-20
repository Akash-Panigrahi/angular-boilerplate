import { Component, OnInit, OnDestroy } from '@angular/core';
import { SidenavOverlayService } from '../../services/sidenav/sidenav.service';
import { SidenavOverlayRef } from '../sidenav/sidenav-ref';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { LoginData } from 'src/app/core/types/login';
import { LogoutService } from 'src/app/core/services/logout/logout.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

    private _sidenavOverlayRef: SidenavOverlayRef;

    username: string;
    showLinks: boolean;

    // array defining navigation model
    navigationItems = [
        {
            name: 'Summary',
            url: '/summary',
            icon: 'subject'
        },
        {
            name: 'Details',
            url: '/details',
            icon: 'description'
        }
    ];

    private _onDestroy$ = new Subject<void>();

    constructor(
        private _logout: LogoutService,
        private _sidenavOverlayService: SidenavOverlayService,
        private _storage: StorageService,
        private _breakpointObserver: BreakpointObserver
    ) {}

    ngOnInit() {
        this._storage
            .getItem('user')
            .pipe(takeUntil(this._onDestroy$))
            .subscribe((user: LoginData) => {
                this.username = user.username;
            });

        this._breakpointObserver
            .observe(['(min-width: 768px)'])
            .pipe(takeUntil(this._onDestroy$))
            .subscribe((state: BreakpointState) => {
                this.showLinks = state.matches ? true : false;
            });

    }

    logout() {
        this._logout.logout();
    }

    showSidenav() {
        this._sidenavOverlayRef = this._sidenavOverlayService.open({
            data: {
                username: this.username,
                navigationItems: this.navigationItems
            }
        });
    }

    ngOnDestroy() {
        this._onDestroy$.next();
    }
}
