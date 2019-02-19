import { Component, OnInit } from '@angular/core';
import { LogoutService } from '../../services/logout/logout.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    isNavbarCollapsed = true;

    // array defining navigation model
    navItems = [
        {
            name: 'Summary',
            url: '/summary'
        },
        {
            name: 'Details',
            url: '/details'
        }
    ];

    constructor(
        private _logout: LogoutService,
    ) { }

    ngOnInit() {
    }

    logout() {
        this._logout.logout();
    }
}
