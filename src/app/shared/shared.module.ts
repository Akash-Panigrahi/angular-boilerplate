import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';
import { CopyrightPipe } from './pipes/copyright/copyright.pipe';

@NgModule({
    imports: [CommonModule],
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
