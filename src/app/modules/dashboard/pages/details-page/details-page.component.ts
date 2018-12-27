import { Component, OnInit, HostBinding } from '@angular/core';
import { riseUp } from './details-page.animations';
import { ApiService } from 'src/app/core/services/api/api.service';
import { DetailsPageService } from './details-page.service';

@Component({
    selector: 'app-details-page',
    templateUrl: './details-page.component.html',
    styleUrls: ['./details-page.component.scss'],
    animations: [riseUp],
    providers: [DetailsPageService]
})
export class DetailsPageComponent implements OnInit {

    @HostBinding('@riseUp') riseUp = true;

    clients: any[];

    constructor(
        private _detailsPageService: DetailsPageService
    ) { }

    ngOnInit() {
        this._detailsPageService
            .getReport({})
            .subscribe(
                (res: any) => {
                    this.clients = res;
                },
                (err: Error) => {
                    console.error(err);
                }
            );
    }
}
