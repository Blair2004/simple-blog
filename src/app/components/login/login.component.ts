import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AsyncResponse } from 'src/app/interfaces/async-response';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    form: FormGroup     =   new FormGroup({
        username  :   new FormControl( '', Validators.required ),
        password  :   new FormControl( '', Validators.required ),
    });

    show    =    {
        goodCredentials: false,
        badCredentials: false,
        isSubmitting: false
    }

    httpResponse: string    =   '';
    
    constructor(
        private auth: AuthService,
        private router: Router
    ) { }
    
    ngOnInit() {
    }
    
    /**
     * loing the user using the
     * provided credentials
     * @param void
     * @return void
     */
    login() {
        this.show.goodCredentials   =   false;
        this.show.badCredentials    =   false;

        if( ! this.form.valid ) {
            for( let field in this.form.controls ) {
                this.form.controls[ field ].markAsTouched();
            }
            this.show.badCredentials   =   true;
            this.httpResponse   =   'Unable to proceed the form is invalid';
            return false;
        }

        this.show.isSubmitting  =   true;

        const { username, password }    =   this.form.value;
        console.log( username, password );
        this.auth.login( username, password ).then( (response:AsyncResponse ) => {
            setInterval( () => {
                this.router.navigateByUrl( '/dashboard/posts' );
            }, 2000 );
            this.httpResponse   =   response.message;
            this.show.goodCredentials   =   true;
            this.show.badCredentials    =   false;
            this.show.isSubmitting  =   false;
        }).catch( (response: AsyncResponse ) => {
            this.httpResponse   =   response.message;
            this.show.goodCredentials   =   false;
            this.show.badCredentials    =   true;
            this.show.isSubmitting  =   false;
            this.resetForm();
        })
    }

    /**
     * reset the form
     * @return void
     */
    resetForm() {
        for( let field in this.form.controls ) {
            this.form.controls[ field ].setValue('');
        }
    }

    /**
     * Computed Property to 
     * test if the username field is valid
     */
    get isUsernameInvalid() {
        const passwordField  =   this.form.get( 'username' );
        return passwordField.invalid && passwordField.touched;
    }

    /**
     * Computed property to test
     * if a password is valid or not
     */
    get isPasswordInvalid() {
        const passwordField  =   this.form.get( 'password' );
        return passwordField.invalid && passwordField.touched;
    }
}
