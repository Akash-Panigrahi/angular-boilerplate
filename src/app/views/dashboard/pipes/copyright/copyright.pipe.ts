import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'copyright'
})
export class CopyrightPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        return `Copyright &copy; ${new Date().getFullYear()} ${value}. All rights reserved.`;
    }
}
