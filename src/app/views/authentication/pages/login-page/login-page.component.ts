import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';

import { loginPageAnimation } from './login-page.animations';
import { LoginPageService } from './login-page.service';
import { LoginData } from 'src/app/core/types/login';
import { ToastComponent } from 'src/app/core/components/toast/toast.component';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss'],
    animations: [loginPageAnimation],
    /**
     * using 'providers' the scope of 'LoginPageService'
     * is limited to this component class and it's descendents
     */
    providers: [LoginPageService]
})
export class LoginPageComponent implements OnInit {
    // animation
    @HostBinding('@loginPageAnimation')
    private _loginPageAnimation = true;

    // password visibility toggling
    passwordVisibility = false;
    passwordFieldType = 'password';
    loggingIn = false;

    // creating form using formbuilder
    loginForm = this._formBuilder.group({
        username: [
            'skyfleet',
            [Validators.required, Validators.minLength(5), Validators.maxLength(32)]
        ],
        password: [
            'skysvibe',
            [Validators.required, Validators.minLength(8), Validators.maxLength(128)]
        ]
    });

    /*
        specifying getters for form controls.
        otherwise, one had to use loginForm.get('username') in the template
        to reference the field model
    */
    get username() {
        return this.loginForm.get('username');
    }
    get password() {
        return this.loginForm.get('password');
    }

    constructor(
        private _router: Router,
        private _formBuilder: FormBuilder,
        private _loginPageService: LoginPageService,
        private _snackBar: MatSnackBar
    ) {}

    ngOnInit() {}

    togglePasswordVisibility() {
        this.passwordVisibility = !this.passwordVisibility;
        this.passwordFieldType = this.passwordVisibility ? 'text' : 'password';
    }

    onSubmit() {
        this.loggingIn = true;

        this._loginPageService.login(this.loginForm.value)
            .subscribe(
                (res: LoginData) => {

                    this._snackBar.openFromComponent(
                        ToastComponent,
                        {
                            data: {
                                message: `${this.username.value} logged in successfully!`,
                                status: 'success'
                            }
                        }
                    );

                    this._router.navigateByUrl('/summary');
                },
                (err: Error) => {
                    /**
                     * any error thrown from the observable will be catch by this
                     * error observer
                     */

                    this.loggingIn = false;

                    this._snackBar.openFromComponent(
                        ToastComponent,
                        {
                            data: {
                                message: err.message,
                                status: 'error'
                            }
                        }
                    );
                }
            );
    }
}
