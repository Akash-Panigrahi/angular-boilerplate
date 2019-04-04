import { NgModule } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CommonModule } from '@angular/common';
import {
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatDividerModule,
    MatRippleModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatTooltipModule
} from '@angular/material';

import { RippleOnClickDirective } from './directives/ripple-on-click/ripple-on-click.directive';
import { OverlayModule } from '@angular/cdk/overlay';
import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
    imports: [
        // private
        CommonModule,

        // public
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatMenuModule,
        MatSidenavModule,
        OverlayModule,
        LayoutModule,
        MatDividerModule,
        MatRippleModule,
        MatSnackBarModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatSelectModule,
        MatTooltipModule
    ],
    declarations: [
        // public
        RippleOnClickDirective
    ],
    // declarations and imports needs to be exported to be used by other modules
    exports: [
        RippleOnClickDirective,

        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatMenuModule,
        MatSidenavModule,
        OverlayModule,
        LayoutModule,
        MatDividerModule,
        MatRippleModule,
        MatSnackBarModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatSelectModule,
        MatTooltipModule
    ]
})
export class SharedModule {
    constructor() {
        if (!environment.production) {
            console.log('SharedModule loaded');
        }
    }
}
