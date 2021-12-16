import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/api/auth.service';


export enum FieldType {
  email = 'email',
  password = 'password'
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public passwordVisibility = true;

  readonly fieldState = [
    FieldType.email,
    FieldType.password
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
