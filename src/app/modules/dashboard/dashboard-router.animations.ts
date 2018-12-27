import {
    sequence, trigger, stagger, animate, style, group, query as q, transition, keyframes, animateChild
} from '@angular/animations';

const query = (s, a, o = { optional: true }) => q(s, a, o);

export const dashboardRouterAnimation = trigger('dashboardRouterAnimation', [
    transition('* => *', [
        query(':enter, :leave', style({ position: 'fixed', width: '100%' })),
        query(':enter', style({ transform: 'translateX(100%)' })),
        sequence([
            query(':leave', animateChild()),
            group([
                query(':leave', [
                    style({ transform: 'translateX(0%)' }),
                    animate('750ms ease-out', style({ transform: 'translateX(-100%)' }))
                ]),
                query(':enter', [
                    style({ transform: 'translateX(100%)' }),
                    animate('750ms ease-out', style({ transform: 'translateX(0%)' })),
                ]),
            ]),
            query(':enter', animateChild()),
        ])
    ])
]);
