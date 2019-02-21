import { Component, HostBinding } from '@angular/core';
import { authenticationAnimation } from './authentication.animations';

@Component({
    selector: 'app-authentication',
    templateUrl: './authentication.component.html',
    styleUrls: ['./authentication.component.scss'],
    animations: [authenticationAnimation]
})
export class AuthenticationComponent {

    @HostBinding('@authenticationAnimation')
    private _authenticationAnimation = true;
}
