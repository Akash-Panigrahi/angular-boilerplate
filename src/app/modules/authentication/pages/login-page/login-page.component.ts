import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { slideDownTillOutside, borderExpandOnHover } from './login-page.animations';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss'],
    animations: [
        slideDownTillOutside,
        borderExpandOnHover
    ]
})
export class LoginPageComponent implements OnInit {

    // animation
    @HostBinding('@slideDownTillOutside') get slideDownTillOutside() { return ''; }
    @HostBinding('@borderExpandOnHover') get borderExpandOnHover() { return ''; }

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
        private _formBuilder: FormBuilder
    ) { }

    ngOnInit(): void { }

    togglePasswordVisibility(): void {
        this.passwordVisibility = !this.passwordVisibility;
        this.passwordFieldType = this.passwordVisibility ? 'text' : 'password';
    }

    onSubmit(): void {
        this._router.navigate(['home/summary']);
    }
}
