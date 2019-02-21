import {
    trigger, animate, style, group, query, transition, sequence, animateChild
} from '@angular/animations';

export const dashboardAnimation = trigger('dashboardAnimation', [
    transition(':enter', group([
        // Initial Styles
        query('.app-action-bar', style({ opacity: '0' })),
        query('.app-header', style({
            transform: 'translateY(-100%)', opacity: '0'
        })),
        query('.app-footer', style({
            transform: 'translateY(100%)', opacity: '0'
        })),

        // Animations
        sequence([
            query('.app-header', animate('500ms ease-out', style('*'))),
            group([
                query('.app-footer', animate('500ms ease-out', style('*'))),
                query('.app-action-bar', animate('500ms ease-out', style('*'))),
                query('.app-section', animateChild())
            ])
        ])
    ])),
    transition(':leave', sequence([
        // Animations
        query('.app-section', animateChild()),
        group([
            query('.app-header', animate('500ms ease-out', style({
                transform: 'translateY(-100%)', opacity: '0'
            }))),
            query('.app-footer', animate('500ms ease-out', style({
                transform: 'translateY(100%)', opacity: '0'
            }))),
            query('.app-action-bar', animate('500ms ease-out', style({
                opacity: 0
            }))),
            query('.app-section', animate('500ms ease-out', style({
                opacity: 0
            })))
        ])
    ]))
]);
