import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'yyyyMMdd'
})
export class YyyyMmDdPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        return new DatePipe('en-US').transform(value, 'yyyy-MM-dd');
    }
}
