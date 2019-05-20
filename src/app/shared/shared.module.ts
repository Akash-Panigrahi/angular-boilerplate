import { NgModule } from '@angular/core';
import { environment } from 'src/environments/environment';
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
    MatTooltipModule,
    MatDialogModule
} from '@angular/material';

import { OverlayModule } from '@angular/cdk/overlay';
import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
    imports: [
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
        MatTooltipModule,
        MatDialogModule
    ],
    // declarations and imports needs to be exported to be used by other modules
    exports: [
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
        MatTooltipModule,
        MatDialogModule
    ]
})
export class SharedModule {
    constructor() {
        if (!environment.production) {
            console.log('SharedModule loaded');
        }
    }
}
