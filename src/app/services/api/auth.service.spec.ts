import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthService } from './auth.service';
import { IUser } from '../../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { RegisterComponent } from '../../authorization/register/register.component';
import { LoginComponent } from '../../authorization/login/login.component';
import { MainComponent } from '../../main/main.component';
import { IToken } from '../../interfaces/token';

const mockUser: IUser = {
  _id: '1',
  userName: 'FirstUserName',
  email: 'test@mail.com',
  password: 'password'
};

const mockToken: IToken = {
  token: '123123',
  refToken: '123123'
};

describe('AuthService tests', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
        RouterTestingModule.withRoutes(
          [
            {path: 'auth/register', component: RegisterComponent},
            {path: 'auth/login', component: LoginComponent},
            {path: 'main', component: MainComponent}
          ]
        )],
      providers: [AuthService]
    });
    authService = TestBed.inject(AuthService);
    httpMock = TestBed.get(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  it('Should create AuthService', () => {
    expect(authService).toBeDefined();
  });

  it('should register user', () => {
    authService.register(mockUser).subscribe((user) => {
      expect(user).toEqual(mockUser);
    });
    const req = httpMock.expectOne('https://todo-list-back-angular.herokuapp.com/api/auth/register');
    expect(req.request.method).toEqual('POST');
    req.flush(mockUser);
    httpMock.verify();
  });

  it('should login user', () => {
    authService.login(mockUser).subscribe((user) => {
      expect(user).toEqual(mockUser);
    });
    const req = httpMock.expectOne('https://todo-list-back-angular.herokuapp.com/auth/login');
    expect(req.request.method).toEqual('POST');
    req.flush(mockUser);
    httpMock.verify();
  });

  it('should refresh token', () => {
    authService.refreshToken().subscribe((token) => {
      expect(mockToken).toEqual(token);
    });
    const req = httpMock.expectOne('https://todo-list-back-angular.herokuapp.com/api/auth/refreshToken');
    expect(req.request.method).toEqual('POST');
    req.flush(mockToken);
    httpMock.verify();
  });
});
