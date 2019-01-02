import {
    trigger, animate, style, query as q, transition
} from '@angular/animations';

export function query(s, a, o = { optional: true }) { return q(s, a, o); }

export const slideDown = trigger('slideDown', [
    transition('* => *', [
        query('.daterangepicker', [
            style({ transform: 'translateY(-50px)', opacity: '0' }),
            animate('350ms ease-in', style('*'))
        ])
    ])
]);
