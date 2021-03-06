import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['../auth.styles.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  formErrors = {
    email: {errorType: null, show: false},
    password: {errorType: null, show: false},
    confirmPassword: {errorType: null, show: false}
  };

  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  // TODO Finish sign up functionality
  // CREATE REMIND PASSWORD

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      username: new FormControl(null , {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      email: new FormControl(null,
        {
          validators: [Validators.email, Validators.required],
          updateOn: 'blur',
        }),
      password: new FormControl(null, {
        validators: [Validators.required],
        updateOn: 'blur',
      }),
      confirmPassword: new FormControl(null, {
        validators: [Validators.required],
        updateOn: 'blur',
      })
    });
  }

  signUp(): void {
    const {username, email, password, confirmPassword} = this.signUpForm.value;


    this.authService.signUp(username, email, password, confirmPassword).subscribe(res => {
      // TODO end signUp
    }, err => {
      console.log(err);
    });
  }
}
