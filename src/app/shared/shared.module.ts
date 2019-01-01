import { NgModule } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CopyrightPipe } from './pipes/copyright/copyright.pipe';
import { RippleOnClickDirective } from './directives/ripple-on-click/ripple-on-click.directive';
import { KpiComponent } from './components/kpi/kpi/kpi.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [CommonModule],
    declarations: [CopyrightPipe, RippleOnClickDirective, KpiComponent],
    exports: [CopyrightPipe, RippleOnClickDirective, KpiComponent]
})
export class SharedModule {
    constructor() {
        if (!environment.production) {
            console.log('SharedModule loaded');
        }
    }
}
