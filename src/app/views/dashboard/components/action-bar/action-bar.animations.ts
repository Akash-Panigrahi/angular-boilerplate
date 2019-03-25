import {
    trigger, animate, style, query, transition
} from '@angular/animations';

export const slideDown = trigger('slideDown', [
    transition('* => *', [
        query('.daterangepicker', [
            style({ transform: 'translateY(-50px)', opacity: '0' }),
            animate('350ms ease-in', style('*'))
        ], { optional: true })
    ])
]);
