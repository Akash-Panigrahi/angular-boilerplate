import { trigger, transition, query, style, animate, animateChild, sequence } from '@angular/animations';

export const detailsPageAnimation = trigger('detailsPageAnimation', [
    transition(':enter', [
        query(':enter', animateChild(), { optional: true })
    ]),
    transition(':leave', [
        sequence([
            query(':leave', animateChild(), { optional: true }),
            // query('.child-component', [
            //     animate('500ms ease-in', style({ transform: 'translateY(150px)', opacity: '0' }))
            // ], { optional: true })
        ])
    ])
]);
