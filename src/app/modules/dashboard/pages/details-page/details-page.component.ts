import { Component, OnInit, HostBinding } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { riseUp } from './details-page.animations';

@Component({
    selector: 'app-details-page',
    templateUrl: './details-page.component.html',
    styleUrls: ['./details-page.component.scss'],
    animations: [riseUp]
})
export class DetailsPageComponent implements OnInit {

    @HostBinding('@riseUp') riseUp = true;

    clients: any[];

    constructor(private _http: HttpClient) { }

    ngOnInit() {
        this._http.get('https://5a5a9e00bc6e340012a03796.mockapi.io/clients')
            .subscribe((data: any[]) => {
                this.clients = data;
            });
    }
}
