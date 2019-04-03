import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

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

    searchBox = new FormControl();

    constructor() {}

    ngOnInit() {
        this.searchBox.valueChanges
            .pipe(
                debounceTime(400),
                distinctUntilChanged()
            )
            .subscribe(text => this.searchChangeEvent.emit(text));
    }
}
