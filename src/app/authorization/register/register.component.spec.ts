import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [HttpClientTestingModule,
        RouterTestingModule,
        MatCardModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create Register Component', () => {
    expect(component).toBeTruthy();
  });

  it('should define Register form inputs', () => {
    const formElement = fixture.nativeElement.querySelectorAll('input');
    expect(formElement.length).toEqual(4);
  });

  it('check initial values for Register input', () => {
    const loginForm = component.registerForm;
    const loginFormValues = {userName: '', email: '', password: '', repeatPassword: ''};
    expect(loginForm.value).toEqual(loginFormValues);
  });

  it('check values from RegisterFormControl and input equality', () => {
    const userNameInputElement = fixture.nativeElement.querySelectorAll('input')[0];
    const emailInputElement = fixture.nativeElement.querySelectorAll('input')[1];
    const passwordInputElement = fixture.nativeElement.querySelectorAll('input')[2];
    const repeatPasswordInputElement = fixture.nativeElement.querySelectorAll('input')[3];
    const userNameFormControl = component.registerForm.controls['userName'];
    const emailFormControl = component.registerForm.controls['email'];
    const passwordFormControl = component.registerForm.controls['password'];
    const repeatPasswordFormControl = component.registerForm.controls['repeatPassword'];
    expect(userNameInputElement.value).toEqual(userNameFormControl.value);
    expect(repeatPasswordInputElement.value).toEqual(repeatPasswordFormControl.value);
    expect(emailInputElement.value).toEqual(emailFormControl.value);
    expect(passwordInputElement.value).toEqual(passwordFormControl.value);
    expect(emailFormControl.errors).not.toBeNull();
    expect(passwordFormControl.errors).not.toBeNull();
  });

  it('check form validators', () => {
    const userNameInputElement = fixture.nativeElement.querySelectorAll('input')[0];
    const emailInputElement = fixture.nativeElement.querySelectorAll('input')[1];
    const passwordInputElement = fixture.nativeElement.querySelectorAll('input')[2];
    const repeatPasswordInputElement = fixture.nativeElement.querySelectorAll('input')[3];

    userNameInputElement.value = 'ahsdkfha';
    emailInputElement.value = 'lkasdfjl@mail.com';
    passwordInputElement.value = '11111Aa.111';
    repeatPasswordInputElement.value = '11111Aa.111';

    userNameInputElement.dispatchEvent(new Event('input'));
    emailInputElement.dispatchEvent(new Event('input'));
    passwordInputElement.dispatchEvent(new Event('input'));
    repeatPasswordInputElement.dispatchEvent(new Event('input'));

    const isFormValid = component.registerForm.valid;
    return fixture.whenStable().then(() => {
      expect(isFormValid).toBeTruthy();
    });
  });
});
