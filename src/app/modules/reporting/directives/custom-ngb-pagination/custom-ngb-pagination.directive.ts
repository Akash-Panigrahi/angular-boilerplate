import {
    Directive, Host, Self, Optional, HostListener, Output, EventEmitter, SimpleChanges, OnChanges, Input
} from '@angular/core';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';

@Directive({
    selector: '[appCustomNgbPagination]'
})
export class CustomNgbPaginationDirective implements OnChanges {

    @Input() initialPageSet;

    private _lastPage = 1;

    @Output() customPageChangeEvent = new EventEmitter<number>();

    @HostListener('click', ['$event.target'])
    private _onClick(el) {

        if (
            el.localName === 'li' &&
            el.classList.contains('disabled')
        ) {
            return;
        }

        if (
            (
                el.localName === 'span' &&
                el.parentElement.classList.contains('page-link')
            ) ||
            (
                el.localName === 'a' &&
                el.classList.contains('page-link')
            )
        ) {

            if (this._lastPage === this._hostEl.page) {
                return;
            }

            this._lastPage = this._hostEl.page;
            this.customPageChangeEvent.emit(this._hostEl.page);
        }
    }

    constructor(
        @Host() @Self() @Optional() private _hostEl: NgbPagination
    ) { }

    ngOnChanges(changes: SimpleChanges) {
        this._lastPage = 1;
    }
}
