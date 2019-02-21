import {
    sequence, trigger, animate, style, group, query, transition, animateChild
} from '@angular/animations';

export const appRoutingAnimation = trigger('appRoutingAnimation', [
    transition('* => *', [
        query(':enter, :leave', style({
            position: 'fixed', width: '100%', height: '100%'
        }), { optional: true }),

        query(':enter', style({
            transform: 'translateX(100%)'
        }), { optional: true }),

        sequence([
            query(':leave', animateChild(), { optional: true }),
            group([
                query(':leave', [
                    style({ transform: 'translateX(0%)' }),
                    animate('500ms', style({ transform: 'translateX(-100%)' }))
                ], { optional: true }),
                query(':enter', [
                    style({ transform: 'translateX(100%)' }),
                    animate('500ms', style({ transform: 'translateX(0%)' })),
                ], { optional: true }),
            ]),
            query(':enter', animateChild(), { optional: true })
        ])
    ])
]);
