import { trigger, transition, query as q, style, animate, stagger } from '@angular/animations';

const query = (s, a, o = { optional: true }) => q(s, a, o);

export const riseUp = trigger('riseUp', [
    transition(':enter', [
        query('.child-component', [
            style({ transform: 'translateY(150px)', opacity: '0' }),
            stagger('200ms', animate('750ms ease-out', style('*')))
        ])
    ])
]);
