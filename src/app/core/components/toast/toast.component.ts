import { Component, OnInit, Inject, HostBinding } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
    selector: 'app-toast',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

    @HostBinding('class') status: string;

    constructor(
        @Inject(MAT_SNACK_BAR_DATA) public data: any
    ) {}

    ngOnInit() {
        this.status = this.data.status;
    }
}
