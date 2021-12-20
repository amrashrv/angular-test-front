import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/api/auth.service';
import { LOGIN_FIELD_NAME } from '../../consts/consts';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public passwordVisibility = true;

  readonly fieldState = [
    LOGIN_FIELD_NAME.email,
    LOGIN_FIELD_NAME.password
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
