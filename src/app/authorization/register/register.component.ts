import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';

import { AuthService } from '../../services/api/auth.service';

export enum fieldType {
  userName = 'userName',
  email = 'email',
  password = 'password',
  repeatPassword = 'repeatPassword'
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  readonly fieldStates = [{
    type: fieldType.userName,
    label: 'user name',
  }, {
    type: fieldType.email,
    label: 'email',
    validator: 'email'
  }, {
    type: fieldType.password,
    label: 'password',
    validator: 'password'
  }, {
    type: fieldType.repeatPassword,
    label: 'repeat password'
  }];

  registerForm = new FormGroup({
    userName: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(4)])),
    email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
      ]
    ),
    password: new FormControl('',
      Validators.compose([
        Validators.required,
        Validators.pattern(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/)])),
    repeatPassword: new FormControl('', [
      Validators.required,
      this.passwordsCompare()])
  });

  constructor(
    private authService: AuthService
  ) {
  }

  passwordsCompare(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }
      return value !== this.registerForm.controls['password'].value ? {notEqual: true} : null;
    };
  }

  onSubmit(): void {
    this.authService.register(this.registerForm.value).subscribe();
  }

}
