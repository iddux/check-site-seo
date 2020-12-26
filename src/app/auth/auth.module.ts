import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {RouterModule} from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import {authRoutes} from './auth.routing';
import {SharedModule} from '../common/shared.module';
import {PrintFormErrorComponent} from '../common/components/print-form-error/print-form-error.component';



@NgModule({
  declarations: [LoginComponent, SignUpComponent, PrintFormErrorComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(authRoutes),
    SharedModule,
  ]
})
export class AuthModule { }
