import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../common/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  formErrors = {
    email: {errorType: null, show: false},
    password: {errorType: null, show: false}
  };

  constructor(private api: ApiService) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null,
        {
          validators: [Validators.email, Validators.required],
          updateOn: 'blur'
        }),
      password: new FormControl(null,
        {
          validators: Validators.required,
          updateOn: 'blur',
        })
    });
  }

  onLoginFormSubmit(): void {
    const email = this.loginForm.controls.email.value;
    const password = this.loginForm.controls.password.value;

    this.api.login(email, password).subscribe(res => {
      console.log(res);
    }, err => console.log(err));
  }
}
