import {
    Component, OnInit, EventEmitter, Output, Input
} from '@angular/core';

@Component({
    selector: 'app-details-grid-search',
    templateUrl: './details-grid-search.component.html',
    styleUrls: ['./details-grid-search.component.scss']
})
export class DetailsGridSearchComponent implements OnInit {

    @Input()
    initialSearchValue: string;

    @Output()
    searchChangeEvent = new EventEmitter<string>();

    constructor() { }

    ngOnInit() {
    }

}
