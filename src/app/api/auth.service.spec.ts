import { TestBed, getTestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { IUser } from '../interfaces/user';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

const mockUser: IUser = {
  _id: '12312312',
  userName: ';ajsdfljksad',
  email: 'e;maipflasf',
  password: 'jalsdjfllsjda;f'
}
const mockUser2: IUser = {
  _id: '1231232',
  userName: ';ajsdfljksad',
  email: 'e;maipflasf',
  password: 'jalsdjfllsjda;f'
}

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

  // it('clear localStorage on logout', () => {
  //   service.logout();
  //   expect(localStorage.getItem('token')).not.toBeTruthy();
  // });
});
