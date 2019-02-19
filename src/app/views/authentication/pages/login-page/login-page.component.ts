import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { loginPageAnimation, errorSlideDown } from './login-page.animations';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginPageService } from './login-page.service';
import { ToastrService } from 'ngx-toastr';
import { LoginData } from '../../interfaces/login.interfaces';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss'],
    animations: [
        loginPageAnimation,
        errorSlideDown
    ],
    /**
     * using 'providers' the scope of 'LoginPageService'
     * is limited to this component class and it's descendents
     */
    providers: [LoginPageService]
})
export class LoginPageComponent implements OnInit {

    // animation
    @HostBinding('@loginPageAnimation') get loginPageAnimation() { return ''; }

    // password visibility toggling
    passwordVisibility = false;
    passwordFieldType = 'password';
    loggingIn = false;

    // creating form using formbuilder
    loginForm = this._formBuilder.group({
        username: ['skyfleet', [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(32)
        ]],
        password: ['skysvibe', [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(128)
        ]]
    });

    /*
        specifying getters for form controls.
        otherwise, one had to use loginForm.get('username') in the template
        to reference the field model
    */
    get username() { return this.loginForm.get('username'); }
    get password() { return this.loginForm.get('password'); }

    constructor(
        private _router: Router,
        private _formBuilder: FormBuilder,
        private _loginPageService: LoginPageService,
        private _toastr: ToastrService
    ) { }

    ngOnInit() { }

    togglePasswordVisibility() {
        this.passwordVisibility = !this.passwordVisibility;
        this.passwordFieldType = this.passwordVisibility ? 'text' : 'password';
    }

    onSubmit() {
        this.loggingIn = true;

        this._loginPageService
            .login(this.loginForm.value)
            .subscribe(
                (res: LoginData) => {

                    this._toastr.success(`${res.username} logged in successfully!`);
                    this._router.navigateByUrl('/summary');
                },
                (err: Error) => {
                    /*
                        any error thrown from the observable will be catch by this
                        error observer
                    */

                    this.loggingIn = false;

                    this._toastr.error(err.message);
                }
            );
    }
}
