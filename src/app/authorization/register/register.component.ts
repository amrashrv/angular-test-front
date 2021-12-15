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

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  existMessage = '';

  registerForm = new FormGroup({
    userName: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(4)])),
    email: new FormControl('', [
        Validators.required,
        Validators.email,
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

  showMessage() {
    setInterval(() => this.existMessage = this.authService.existErrorMessage, 3000);
    return this.existMessage;
  }

  onSubmit() {
    this.authService.register(this.registerForm.value).subscribe();
    this.showMessage();
  }

}
