import {
    trigger, animate, style, group, query as q, transition, sequence, animateChild
} from '@angular/animations';

const query = (s, a, o = { optional: true }) => q(s, a, o);

export const pageAnimation = trigger('pageAnimation', [
    transition(':enter', group([
        // Initial Styles
        query('.app-action-bar', style({ opacity: '0' })),
        query('.app-header', style({ transform: 'translateY(-100%)', opacity: '0' })),
        query('.app-footer', style({ transform: 'translateY(100%)', opacity: '0' })),

        // Animations
        sequence([
            query('.app-header', animate('500ms ease-out', style('*'))),
            group([
                query('.app-footer', animate('500ms ease-out', style('*'))),
                query('.app-action-bar', animate('500ms ease-out', style('*'))),
                query('.app-section', animateChild()),
            ])
        ])
    ])),
    transition(':leave', group([
        // Animations
        query('.app-header', animate('500ms ease-out', style({ transform: 'translateY(-100%)', opacity: '0' }))),
        query('.app-footer', animate('500ms ease-out', style({ transform: 'translateY(100%)', opacity: '0' }))),
        query('.app-action-bar', animate('500ms ease-out', style({ opacity: '0' })))
    ]))
]);
