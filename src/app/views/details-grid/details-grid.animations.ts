import {
    animate, style, trigger, transition, state, query, stagger, group
} from '@angular/animations';

export const initialTableReady = trigger('initialTableReady', [

    state('no', style({ transform: 'translateY(30px)', opacity: 0 })),
    state('yes', style('*')),

    transition('no => yes', [
        query('.child-component', style({ opacity: 0 }), { optional: true }),
        group([
            animate('250ms'),
            query('.child-component', [
                stagger('200ms ease', animate('200ms ease-in', style('*')))
            ], { optional: true })
        ])
    ])
]);

export const gettingDetailsLoader = trigger('gettingDetailsLoader', [

    transition(':enter', animate('300ms ease-out')),

    transition(':leave', animate('400ms ease-in-out', style({
        opacity: 0, transform: 'translateY(-100px)', height: 'auto'
    })))
]);
