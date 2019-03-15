import {
    trigger, animate, style, transition, state
} from '@angular/animations';

export const slideDownRangesAnimation = trigger('slideDownRangesAnimation', [

    state('void', style({ transform: 'translateY(-50px)', opacity: '0' })),
    state('open', style('*')),
    state('close', style({ transform: 'translateY(-50px)', opacity: '0' })),

    transition('* => *', animate('350ms ease-in-out'))
]);
