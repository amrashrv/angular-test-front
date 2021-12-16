import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/api/auth.service';


export enum fieldType {
  email = 'email',
  password = 'password'
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  readonly fieldState = [
    fieldType.email,
    fieldType.password
  ];

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    private authService: AuthService,
  ) {
  }

  onSubmit(): void {
    this.authService.login(this.loginForm.value).subscribe();
  }

}
