import { NgModule } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RippleOnClickDirective } from './directives/ripple-on-click/ripple-on-click.directive';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [CommonModule],
    declarations: [RippleOnClickDirective],
    // declarations needs to be exported to be used by other modules
    exports: [RippleOnClickDirective]
})
export class SharedModule {
    constructor() {
        if (!environment.production) {
            console.log('SharedModule loaded');
        }
    }
}
