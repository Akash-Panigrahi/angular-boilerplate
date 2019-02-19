import { trigger, transition, query, animateChild } from '@angular/animations';

export const detailsPageAnimation = trigger('detailsPageAnimation', [
    transition(':enter', [
        query(':enter', animateChild(), { optional: true })
    ]),
    transition(':leave', [
        query(':leave', animateChild(), { optional: true })
    ])
]);
