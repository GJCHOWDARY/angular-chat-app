import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FotgotPasswordComponent } from './fotgot-password/fotgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AngularMaterialModule } from "../angular-material.module";


@NgModule({
  declarations: [LoginComponent, SignupComponent, FotgotPasswordComponent, ResetPasswordComponent],
  imports: [
    CommonModule,
    AngularMaterialModule
  ]
})
export class AuthModule { }
