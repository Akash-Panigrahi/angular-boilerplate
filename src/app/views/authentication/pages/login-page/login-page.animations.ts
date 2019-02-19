import { trigger, stagger, animate, style, group, query, transition } from '@angular/animations';

export const loginPageAnimation = trigger('loginPageAnimation', [
    transition(':enter', [
        query('.login', style({
            opacity: '0', transform: 'rotateX(-90deg) translateY(150px) translateZ(50px)'
        }), { optional: true }),
        query('.login__logo', style({ transform: 'scale(0)' }), { optional: true }),
        query('.login__form [type]', style({
            opacity: '0', transform: 'scale(0.8) translateY(10px)'
        }), { optional: true }),

        group([
            query('.login', [
                animate('350ms ease-in-out', style({
                    opacity: '1', transform: 'matrix(1, 0, 0, 1, 0, 0)'
                }))
            ], { optional: true }),
            query('.login__logo', animate('100ms ease-in', style('*')), { optional: true }),
            query('.login__form [type]', stagger('100ms', [
                animate('100ms 250ms ease-out', style('*'))
            ]), { optional: true })
        ])
    ]),
    transition(':leave', [
        query('.login', [
            style({ transform: 'translateY(0px)', opacity: 1 }),
            animate('400ms', style({
                transform: 'translateY(-50px)', opacity: '0'
            })),
        ], { optional: true }),
    ])
]);

export const errorSlideDown = trigger('errorSlideDown', [
    transition(':enter', [
        style({ perspective: '1000px' }),
        query('div', [
            style({
                opacity: 0, transform: 'rotateX(70deg)', transformOrigin: 'top center'
            }),
            animate('500ms', style('*'))
        ], { optional: true }),
    ]),
    transition(':leave', animate('300ms', style({
        height: 0, opacity: 0, transform: 'scaleY(0.8)'
    })))
]);
