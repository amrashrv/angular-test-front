import { TestBed, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { AuthService } from './auth.service';
import { IUser } from '../../interfaces/user';

const mockUser: IUser = {
  _id: '1',
  userName: 'FirstUserName',
  email: 'test@mail.com',
  password: 'password'
};

describe('AuthService tests', () => {
  let service: AuthService;
  const serviceSpy = jasmine.createSpyObj('AuthService', ['login', 'register']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [{provide: AuthService, useValue: serviceSpy}],
    });
    service = TestBed.inject(AuthService);
  });

  it('Should create AuthService', () => {
    expect(service).toBeDefined();
  });

  it('should login user', fakeAsync(() => {
    serviceSpy.login.and.returnValue(of(mockUser));
    service.login(mockUser).subscribe((item: IUser) => {
      expect(mockUser).toEqual(item);
    });
  }));

  it('should register user', fakeAsync(() => {
    serviceSpy.register.and.returnValue(of(mockUser));
    service.register(mockUser).subscribe((item: IUser) => {
      expect(mockUser).toEqual(item);
    });
  }));

});