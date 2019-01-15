import { trigger, transition, query, style, animate, animateChild, sequence } from '@angular/animations';

export const riseUp = trigger('riseUp', [
    transition(':enter', [
        query(':enter', animateChild())
    ]),
    transition(':leave', [
        sequence([
            query(':leave', animateChild()),
            query('.child-component', [
                animate('500ms ease-in', style({ transform: 'translateY(150px)', opacity: '0' }))
            ])
        ])
    ])
]);
