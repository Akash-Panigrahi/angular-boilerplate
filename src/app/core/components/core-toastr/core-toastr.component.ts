import { Component, OnInit, Inject, HostBinding } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
    selector: 'app-core-toastr',
    templateUrl: './core-toastr.component.html',
    styleUrls: ['./core-toastr.component.scss']
})
export class CoreToastrComponent implements OnInit {

    @HostBinding('class') status: string;

    constructor(
        @Inject(MAT_SNACK_BAR_DATA) public data: any
    ) {}

    ngOnInit() {
        this.status = this.data.status;
    }
}
