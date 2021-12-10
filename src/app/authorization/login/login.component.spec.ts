import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '../../services/api/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
  let authService: AuthService;
  const mockUser = {email: 'test@test.com', password: 'password'};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpClientTestingModule,
        RouterTestingModule,
        MatCardModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule],
      providers: [LoginComponent, {provide: AuthService, useValue: authServiceSpy}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create Login Component', () => {
    expect(component).toBeTruthy();
    fixture.detectChanges();
  });

  it('should contain "Login" title', () => {
    const element: HTMLElement = fixture.nativeElement;
    expect(element.innerText).toContain('Login');
  });

  it('should define Login form inputs', () => {
    const formElement = fixture.nativeElement.querySelectorAll('input');
    expect(formElement.length).toEqual(2);
  });

  it('check initial values for Login input', () => {
    const loginForm = component.loginForm;
    const loginFormValues = {email: '', password: ''};
    expect(loginForm.value).toEqual(loginFormValues);
  });

  it('check values from LoginFormControl and input equality', () => {
    const emailInputElement = fixture.nativeElement.querySelectorAll('input')[0];
    const passwordInputElement = fixture.nativeElement.querySelectorAll('input')[1];
    const emailFormControl = component.loginForm.controls['email'];
    const passwordFormControl = component.loginForm.controls['email'];
    expect(emailInputElement.value).toEqual(emailFormControl.value);
    expect(passwordInputElement.value).toEqual(passwordFormControl.value);
    expect(emailFormControl.errors).not.toBeNull();
    expect(passwordFormControl.errors).not.toBeNull();
  });

  it('check form validators', () => {
    const emailInputElement = fixture.nativeElement.querySelectorAll('input')[0];
    const passwordInputElement = fixture.nativeElement.querySelectorAll('input')[1];
    emailInputElement.value = 'lkasdfjl@mail.com';
    passwordInputElement.value = 'hsfdgjk';
    emailInputElement.dispatchEvent(new Event('input'));
    passwordInputElement.dispatchEvent(new Event('input'));
    const isFormValid = component.loginForm.valid;
    return fixture.whenStable().then(() => {
      expect(isFormValid).toBeTruthy();
    });
  });
});
