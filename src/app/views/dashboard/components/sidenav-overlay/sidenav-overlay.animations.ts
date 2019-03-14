import { trigger, animate, style, transition } from '@angular/animations';

export const sidenavOverlayAnimation = trigger('sidenavOverlayAnimation', [
    transition(':enter', [
        style({ transform: 'translate3d(-100%, 0, 0)' }),
        animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)', style('*'))
    ]),
    transition(':leave', [animate('350ms ease-out', style({ transform: 'translate3d(-100%, 0, 0)' }))])
]);
