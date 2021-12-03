import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import { AuthService } from '../../api/auth.service';
import { Router } from '@angular/router';
import {RxwebValidators} from "@rxweb/reactive-form-validators";

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

  registerForm = new FormGroup({
    userName: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(4)])),
    email: new FormControl('', [
        Validators.required,
        Validators.email]),
    password: new FormControl('',
      Validators.compose([
        Validators.required,
        Validators.pattern(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/)])),
    repeatPassword: new FormControl('', [
        Validators.required,
        RxwebValidators.compare({fieldName: 'password'})])
  });

  onSubmit(){
    this.authService.register(this.registerForm.value).subscribe(() => this.router.navigateByUrl('/main'));
  }
  ngOnInit(): void {
  }

}
