import { animate, style, trigger, transition, state } from '@angular/animations';

export const isInitialTableReady__Table = trigger('isInitialTableReady__Table', [
    state('no', style({
        transform: 'translateX(99%)',
        opacity: 0,
    })),
    state('yes', style('*')),

    transition('no => yes', animate('500ms'))
]);

export const gettingClientsLoader = trigger('gettingClientsLoader', [
    state('void', style({ opacity: 0, transform: 'translateY(-100px)', height: 'auto' })),
    state('no', style({
        transform: 'translateX(0)',
        opacity: 1
    })),

    transition('void => no', animate('300ms ease-out')),
    transition('no => yes, :leave', animate('400ms ease-in-out'))
]);

export const showOverlay = trigger('showOverlay', [
    state('void', style({ opacity: 0 })),
    state('no', style({ height: '100%', opacity: 1 })),

    transition('void => no', animate('200ms ease-out')),
    transition('no => yes, :leave', animate('500ms'))
]);