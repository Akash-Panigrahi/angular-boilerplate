import {
    sequence, trigger, animate, style, group, query as q, transition, animateChild
} from '@angular/animations';

export function query(s, a, o = { optional: true }) { return q(s, a, o); }

export const appRouterTransition = trigger('appRouterTransition', [
    transition('* => *', [
        query(':enter, :leave', style({ position: 'fixed', width: '100%', height: '100%' })),
        query(':enter', style({ transform: 'translateX(100%)' })),
        sequence([
            query(':leave', animateChild()),
            group([
                query(':leave', [
                    style({ transform: 'translateX(0%)' }),
                    animate('500ms', style({ transform: 'translateX(-100%)' }))
                ]),
                query(':enter', [
                    style({ transform: 'translateX(100%)' }),
                    animate('500ms', style({ transform: 'translateX(0%)' })),
                ]),
            ]),
            query(':enter', animateChild()),
        ])
    ])
]);
