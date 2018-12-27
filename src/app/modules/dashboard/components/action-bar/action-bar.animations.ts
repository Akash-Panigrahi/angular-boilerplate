import {
    trigger, animate, style, group, query as q, transition, sequence, animateChild, state
} from '@angular/animations';

const query = (s, a, o = { optional: true }) => q(s, a, o);

export const slideDown = trigger('slideDown', [

    transition('* => *', [
        query('.daterangepicker', [
            style({ transform: 'translateY(-50px)', opacity: '0' }),
            animate('350ms ease-in', style('*'))
        ])
    ])

    // transition('close => open', group([
    //     // Initial Styles
    //     query(':enter', style({ opacity: '0' })),
    //     query('.app-header', style({ transform: 'translateY(-100%)', opacity: '0' })),
    //     query('.app-footer', style({ transform: 'translateY(100%)', opacity: '0' })),

    //     // Animations
    //     sequence([
    //         query('.app-header', animate('500ms ease-out', style('*'))),
    //         group([
    //             query('.app-footer', animate('500ms ease-out', style('*'))),
    //             query('.app-action-bar', animate('500ms ease-out', style('*'))),
    //             query('.app-section', animateChild()),
    //         ])
    //     ])
    // ])),
    // transition(':leave', group([
    //     // Animations
    //     query('.app-header', animate('500ms ease-out', style({ transform: 'translateY(-100%)', opacity: '0' }))),
    //     query('.app-footer', animate('500ms ease-out', style({ transform: 'translateY(100%)', opacity: '0' }))),
    //     query('.app-action-bar', animate('500ms ease-out', style({ opacity: '0' })))
    // ]))
]);
