import {
    trigger, animate, style, group, query as q, transition, sequence, animateChild, state
} from '@angular/animations';

const query = (s, a, o = { optional: true }) => q(s, a, o);

export const slideDown = trigger('slideDown', [
    transition('* => *', [
        query('.daterangepicker', [
            style({ transform: 'translateY(-50px)', opacity: '0' }),
            animate('350ms ease-in', style('*'))
        ])
    ])
]);
