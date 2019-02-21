import { transition, trigger, animateChild, query } from '@angular/animations';

export const authenticationAnimation = trigger('authenticationAnimation', [
    transition(':enter, :leave', [
        query(':enter, :leave', animateChild())
    ])
]);
