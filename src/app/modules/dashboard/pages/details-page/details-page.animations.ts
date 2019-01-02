import { trigger, transition, query as q, style, animate } from '@angular/animations';

export function query(s, a, o = { optional: true }) { return q(s, a, o); }

export const riseUp = trigger('riseUp', [
    transition(':leave', [
        query('.child-component', [
            animate('500ms ease-in', style({ transform: 'translateY(150px)', opacity: '0' }))
        ])
    ])
]);
