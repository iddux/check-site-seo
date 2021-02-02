import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

;
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.styles.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  formErrors = {
    email: {errorType: null, show: false},
    password: {errorType: null, show: false}
  };

  constructor(private authService: AuthService, private router: Router) {
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
        })
    });
  }

  onLoginFormSubmit(): void {
    const {email, password} = this.loginForm.value;

    this.authService.login(email, password).subscribe(() => {
      this.router.navigate(['/home']);

    }, err => console.log(err));
  }
}
