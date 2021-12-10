import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/api/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    private authService: AuthService,
  ) {
  }

  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe();
  }

}
