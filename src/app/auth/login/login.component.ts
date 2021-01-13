import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';;
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

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

  constructor(private authService: AuthService , private router: Router) {
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
    const email = this.loginForm.controls.email.value;
    const password = this.loginForm.controls.password.value;

    this.authService.login(email, password).subscribe(res => {
      this.authService.saveToken(res.accessToken);
      this.authService.saveRefreshToken(res.refreshToken);
      this.authService.saveUserData(res.user);

      this.router.navigate(['/home']);

    }, err => console.log(err));
  }
}
