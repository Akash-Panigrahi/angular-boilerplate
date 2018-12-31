import { trigger, animate, style, group, query as q, transition, keyframes } from '@angular/animations';
const query = (s, a, o = { optional: true }) => q(s, a, o);

export const pageNotFoundAnimation = trigger('pageNotFoundAnimation', [
    transition(':enter', [
        group([
            query('.page-not-found__image', [
                style({ transform: 'translateY(-100%)', opacity: '0' }),
                animate('750ms', style({ transform: 'translateY(0px)', opacity: '1' }))
            ]),
            query('.page-not-found__info', [
                style({ transform: 'translateY(100%)', opacity: '0' }),
                animate('750ms', style({ transform: 'translateY(0px)', opacity: '1' }))
            ])
        ])
    ]),
    transition(':leave', [
        group([
            query('.page-not-found__image', [
                animate('750ms', style({ transform: 'translateY(-100%)', opacity: '0' }))
            ]),
            query('.page-not-found__info', [
                animate('750ms', style({ transform: 'translateY(100%)', opacity: '0' }))
            ])
        ])
    ])
]);
