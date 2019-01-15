import { trigger, transition, query, style, animate, stagger } from '@angular/animations';

export const pageAnimations = trigger('pageAnimations', [
    transition(':enter', [
        query('.child-component', [
            style({ transform: 'translateY(150px)', opacity: '0' }),
            stagger('200ms', animate('750ms ease-out', style('*')))
        ])
    ]),
    transition(':leave', [
        query('.child-component, .kpi', [
            stagger('100ms', animate('750ms ease-out', style({
                transform: 'translateX(-350px)',
                opacity: 0
            })))
        ])
    ])
]);
