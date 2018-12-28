import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'hMmA'
})
export class HMmAPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        const [hours, minutes] = value.split(':');

        return new DatePipe('en-US').transform(new Date().setHours(hours, minutes), 'h:mm a');
    }

}
