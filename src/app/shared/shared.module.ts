import { NgModule } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CommonModule } from '@angular/common';
import { MatToolbarModule, MatButtonModule, MatIconModule, MatListModule, MatMenuModule, MatSidenavModule } from '@angular/material';

import { RippleOnClickDirective } from './directives/ripple-on-click/ripple-on-click.directive';

@NgModule({
    imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, MatListModule, MatMenuModule, MatSidenavModule],
    declarations: [RippleOnClickDirective],
    // declarations needs to be exported to be used by other modules
    exports: [RippleOnClickDirective, MatToolbarModule, MatButtonModule, MatIconModule, MatListModule, MatMenuModule, MatSidenavModule]
})
export class SharedModule {
    constructor() {
        if (!environment.production) {
            console.log('SharedModule loaded');
        }
    }
}
