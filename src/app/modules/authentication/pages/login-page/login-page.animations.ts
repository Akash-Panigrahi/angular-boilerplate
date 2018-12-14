import { trigger, stagger, animate, style, group, query as q, transition, keyframes } from '@angular/animations';
const query = (s, a, o = { optional: true }) => q(s, a, o);

export const slideDownTillOutside = trigger('slideDownTillOutside', [
    transition(':enter', [
        query('.login', stagger(500, [
            style({ transform: 'translateX(1000px)' }),
            animate('500ms', style({ transform: 'translateX(0px)' })),
        ])),
    ]),
    transition(':leave', [
        query('.login', stagger(500, [
            style({ transform: 'translateX(0px)', opacity: 1 }),
            animate('500ms', style({ transform: 'translateX(-1000px)' })),
        ])),
    ])
]);

export const borderExpandOnHover = trigger('borderExpandOnHover', [
    transition(':enter', [
        query('.login-form__input-container::before, .login-form__input-container::after', [
            style({ width: '0' }),
            animate('1s', style({ width: '50%' }))
        ])
    ])
]);
