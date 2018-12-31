import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class FormatTimeService {

    constructor() { }

    formatTime(data: string): string {
        const [hours, minutes] = data.split(':').map(parseFloat);

        return formatDate(new Date().setHours(hours, minutes), 'h:mm a', 'en-US');
    }
}
