import {
    Component, Input, Output, EventEmitter
} from '@angular/core';

@Component({
    selector: 'app-details-grid-length',
    templateUrl: './details-grid-length.component.html',
    styleUrls: ['./details-grid-length.component.scss']
})
export class DetailsGridLengthComponent {

    @Input() pageSizes: Array<number>;
    @Input() initialPageSize: number;

    @Output() lengthChangeEvent = new EventEmitter<number>();

    onSelectionChange(value: number): void {
        this.lengthChangeEvent.emit(value);
    }
}
