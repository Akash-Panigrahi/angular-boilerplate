import { trigger, stagger, animate, style, group, query as q, transition } from '@angular/animations';

export function query(s, a, o = { optional: true }) { return q(s, a, o); }

export const loginPageAnimation = trigger('loginPageAnimation', [
    transition(':enter', [
        query('.login', style({ opacity: '0', transform: 'rotateX(-90deg) translateY(150px) translateZ(50px)' })),
        query('.login__logo', style({ transform: 'scale(0)' })),
        query('.login__form [type]', style({ opacity: '0', transform: 'scale(0.8) translateY(10px)' })),

        group([
            query('.login', [
                animate('350ms ease-in-out', style({ opacity: '1', transform: 'matrix(1, 0, 0, 1, 0, 0)' }))
            ]),
            query('.login__logo', animate('100ms ease-in', style('*'))),
            query('.login__form [type]', stagger('100ms', [
                animate('100ms 250ms ease-out', style('*'))
            ]))
        ])
    ]),
    transition(':leave', [
        query('.login', [
            style({ transform: 'translateY(0px)', opacity: 1 }),
            animate('400ms', style({ transform: 'translateY(-50px)', opacity: '0' })),
        ]),
    ])
]);

export const slideDown = trigger('slideDown', [
    transition(':enter', [
        style({ perspective: '1000px' }),
        query('div', [
            style({
                opacity: 0, transform: 'rotateX(70deg)', transformOrigin: 'top center'
            }),
            animate('500ms', style('*'))
        ]),
    ]),
    transition(':leave', animate('300ms', style({ height: 0, opacity: 0, transform: 'scaleY(0.8)' })))
]);
