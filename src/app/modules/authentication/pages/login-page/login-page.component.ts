import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { pageAnimation, borderExpandOnHover, slideDown } from './login-page.animations';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginPageService } from './login-page.service';
import { ToastrService } from 'ngx-toastr';
import { ILoginData } from 'src/app/core/interfaces/login.interface';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss'],
    animations: [
        pageAnimation,
        borderExpandOnHover,
        slideDown
    ],
    providers: [LoginPageService]
})
export class LoginPageComponent implements OnInit {

    // animation
    @HostBinding('@pageAnimation') get pageAnimation() { return ''; }

    // password visibility toggling
    passwordVisibility = false;
    passwordFieldType = 'password';

    // form
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

    // getters for form controls
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
        this._loginPageService
            .login(this.loginForm.value)
            .subscribe(
                (res: ILoginData) => {

                    this._toastr.success(`${res.username} logged in successfully!`);
                    this._router.navigate(['home/summary']);
                },
                (err: Error) => {

                    this._toastr.error(err.message);
                }
            );
    }
}
