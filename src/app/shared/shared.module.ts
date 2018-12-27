import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';
import { YyyyMmDdPipe } from './pipes/yyyy-MM-dd.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [YyyyMmDdPipe],
    exports: [YyyyMmDdPipe],
    providers: [YyyyMmDdPipe, DatePipe]
})
export class SharedModule {
    constructor() {
        if (!environment.production) {
            console.log('SharedModule loaded');
        }
    }
}
