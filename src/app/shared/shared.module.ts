import { NgModule } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CopyrightPipe } from './pipes/copyright/copyright.pipe';

@NgModule({
    declarations: [CopyrightPipe],
    exports: [CopyrightPipe]
})
export class SharedModule {
    constructor() {
        if (!environment.production) {
            console.log('SharedModule loaded');
        }
    }
}
