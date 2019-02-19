import {
    Component, OnInit, EventEmitter, Output, Input
} from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
    selector: 'app-details-grid-search',
    templateUrl: './details-grid-search.component.html',
    styleUrls: ['./details-grid-search.component.scss']
})
export class DetailsGridSearchComponent implements OnInit {

    @Input() initialSearchValue: string;

    @Output() searchChangeEvent = new EventEmitter<string>();

    searchChange$ = new Subject<string>();

    constructor() { }

    ngOnInit() {
        this.searchChange$.asObservable()
            .pipe(
                debounceTime(400),
                distinctUntilChanged()
            )
            .subscribe(text => this.searchChangeEvent.emit(text));
    }
}
