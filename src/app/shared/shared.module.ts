import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';
import { YyyyMmDdPipe } from './pipes/yyyy-MM-dd/yyyy-MM-dd.pipe';
import { HMmAPipe } from './pipes/h-mm-a/h-mm-a.pipe';

@NgModule({
    imports: [CommonModule],
    declarations: [YyyyMmDdPipe, HMmAPipe],
    providers: [DatePipe]
})
export class SharedModule {
    constructor() {
        if (!environment.production) {
            console.log('SharedModule loaded');
        }
    }
}
