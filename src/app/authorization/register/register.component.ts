import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../api/auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  identityRevealedValidator: ValidatorFn = (control: AbstractControl):
  ValidationErrors | null => {
    const userName = control.get('userName');
    const password = control.get('password');
    const email = control.get('email');
    const repeatPassword = control.get('repeatPassword');

    return userName && password && email && repeatPassword && repeatPassword.value !== password.value ? { identityRevealed: true } : null;
  }
  registerForm = new FormGroup({
    userName: new FormControl('', [Validators.minLength(4)]),
    email: new FormControl('', Validators.email),
    password: new FormControl(''),
    repeatPassword: new FormControl('', this.identityRevealedValidator)
  }, {validators: this.identityRevealedValidator});
  onSubmit(){
    this.authService.register(this.registerForm.value).subscribe(() => this.router.navigateByUrl('/main'));
  }

  ngOnInit(): void {
  }

}
