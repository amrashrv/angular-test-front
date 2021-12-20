import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';

import { AuthService } from '../../services/api/authorization/auth.service';
import { emailValidationRegex, passwordValidationRegex, REGISTER_FIELD_NAME, VALIDATION } from '../authorization.model';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  public passwordVisibility = true;

  readonly FieldStates = [{
    name: REGISTER_FIELD_NAME.userName,
    label: 'user name',
    validator: VALIDATION,
    type: 'text'
  }, {
    name: REGISTER_FIELD_NAME.email,
    label: 'email',
    validator: VALIDATION,
    type: 'email'
  }, {
    name: REGISTER_FIELD_NAME.password,
    label: 'password',
    validator: VALIDATION,
    type: 'password'
  }, {
    name: REGISTER_FIELD_NAME.repeatPassword,
    label: 'repeat password',
    validator: VALIDATION,
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
    password: new FormControl('', [
        Validators.required,
        Validators.pattern(passwordValidationRegex)]),
    repeatPassword: new FormControl('', [
      Validators.required,
      this.passwordsCompare()])
  });

  constructor(
    private authService: AuthService,
  ) {
  }

  passwordsCompare(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const passwordValueFromInput = control.value;
      if (!passwordValueFromInput) {
        return null;
      }
      return passwordValueFromInput !== this.registerForm.controls['password'].value ? {unequal: true} : null;
    };
  }

  validateEmail(): ValidatorFn {
   return (control: AbstractControl): ValidationErrors | null => {
      const emailValueFromInput = control.value;
      if (!emailValueFromInput) {
        return null;
      }
      return !emailValueFromInput.match(emailValidationRegex) ? {invalidEmail: true} : null;
    };
  }

  onSubmit(): void {
    this.authService.register(this.registerForm.value).subscribe();
  }

}
