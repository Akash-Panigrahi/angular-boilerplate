import { animate, style, trigger, transition, state } from '@angular/animations';

export const initialTableReady = trigger('initialTableReady', [

    state('no', style({ transform: 'translateX(100%)', opacity: 0 })),
    state('yes', style('*')),

    transition('no => yes',
        animate('500ms')
    )
]);

export const gettingDetailsLoader = trigger('gettingDetailsLoader', [

    transition(':enter',
        animate('300ms ease-out')
    ),

    transition(':leave',
        animate('400ms ease-in-out',
            style({
                opacity: 0, transform: 'translateY(-100px)', height: 'auto'
            })
        )
    )
]);
