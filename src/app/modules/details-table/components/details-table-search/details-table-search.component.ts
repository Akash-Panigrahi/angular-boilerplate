import {
    Component, OnInit, EventEmitter, Output, Input
} from '@angular/core';

@Component({
    selector: 'app-details-table-search',
    templateUrl: './details-table-search.component.html',
    styleUrls: ['./details-table-search.component.scss']
})
export class DetailsTableSearchComponent implements OnInit {

    @Input()
    initialSearchValue: string;

    @Output()
    searchChangeEvent = new EventEmitter<string>();

    constructor() { }

    ngOnInit() {
    }

}
