import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../api/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  loginForm = new FormGroup({
    email: new FormControl('', Validators.email),
    password: new FormControl('')
  });
  onSubmit(){
    this.authService.login(this.loginForm.value).subscribe(() => this.router.navigateByUrl('/main'));
  }
  ngOnInit(): void {

  }

}
