import { Component, OnInit } from '@angular/core';
import { LogoutService } from 'src/app/core/services/logout/logout.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    isNavbarCollapsed = true;

    constructor(
        private _logout: LogoutService,
    ) { }

    ngOnInit() {
    }

    logout() {
        this._logout.logout();
    }
}
