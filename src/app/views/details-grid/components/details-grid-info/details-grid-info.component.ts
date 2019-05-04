import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-details-grid-info',
    templateUrl: './details-grid-info.component.html',
    styleUrls: ['./details-grid-info.component.scss']
})
export class DetailsGridInfoComponent {

    @Input() from: number;
    @Input() to: number;
    @Input() total: number;
    @Input() filtered: number;
}
