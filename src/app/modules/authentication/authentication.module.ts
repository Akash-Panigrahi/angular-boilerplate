import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { environment } from 'src/environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationRoutingModule } from './authentication-routing.module';

@NgModule({
    declarations: [LoginPageComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AuthenticationRoutingModule,
    ]
})
export class AuthenticationModule {
    constructor() {
        if (!environment.production) {
            console.log('AuthenticationModule loaded');
        }
    }
}
