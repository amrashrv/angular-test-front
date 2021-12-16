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

export enum FieldName {
  userName = 'userName',
  email = 'email',
  password = 'password',
  repeatPassword = 'repeatPassword',

}

export enum ValidationType {
  required = 'required',
  minLenght = 'minlength',
  validateEmail = 'invalidEmail',
  pattern = 'pattern',
  compare = 'notEqual'
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  public passwordVisibility = true;

  readonly FieldStates = [{
    name: FieldName.userName,
    label: 'user name',
    validator: ValidationType,
    type: 'text'
  }, {
    name: FieldName.email,
    label: 'email',
    validator: ValidationType,
    type: 'email'
  }, {
    name: FieldName.password,
    label: 'password',
    validator: ValidationType,
    type: 'password'
  }, {
    name: FieldName.repeatPassword,
    label: 'repeat password',
    validator: ValidationType,
    type: 'password'
  }];

  registerForm = new FormGroup({
    userName: new FormControl('', [
      Validators.required,
      Validators.minLength(4)]),
    email: new FormControl('', [
        Validators.required,
        this.validateEmail(),
      ]
    ),
    password: new FormControl('',[
        Validators.required,
        Validators.pattern(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/)]),
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

  validateEmail(): ValidatorFn {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if(!value) {
        return null;
      }
      return !value.match(emailRegex)? {invalidEmail: true} : null
    }
  }

  onSubmit(): void {
    this.authService.register(this.registerForm.value).subscribe();
  }

}
