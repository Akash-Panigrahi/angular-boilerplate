import { formatDate } from '@angular/common';

export class FormatTimeService {

    constructor() { }

    formatTime(data: string): string {

        /*
            e.g. data               '23:44'
                 .split(':')        ['23': '44']
                 .map(parseFloat)   [23, 44]
        */
        const [hours, minutes] = data.split(':').map(parseFloat);

        return formatDate(new Date().setHours(hours, minutes), 'h:mm a', 'en-US');
    }
}
