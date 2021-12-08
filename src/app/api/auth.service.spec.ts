import { TestBed, getTestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { IUser } from '../interfaces/user';
import { RouterTestingModule } from '@angular/router/testing';
import { TestScheduler } from 'rxjs/testing';

const mockUser: IUser = {
  _id: '12312312',
  userName: ';ajsdfljksad',
  email: 'e;maipflasf',
  password: 'jalsdjfllsjda;f'
}
describe('AuthService', () => {
  let injector: TestBed;
  let service: AuthService;
  let httpMock: HttpTestingController;
  let testItem: IUser;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService],
    });

    injector = getTestBed();
    service = injector.get(AuthService);
    httpMock = injector.get(HttpTestingController);
  });
  it('register', () => {
    service.register(mockUser).subscribe((res) => {
      if (res !== undefined) {
        expect(res).toEqual(mockUser);
      }
    });

    const req = httpMock.expectOne('http://localhost:5000/api/auth/register');
    expect(req.request.method).toBe('POST');
    req.flush(mockUser);
  });
  it('login', fakeAsync(() => {
    service.login(mockUser).subscribe((res) => {
      tick(2000);
      expect(res).toEqual(mockUser);
    });
    // const req = httpMock.expectOne('http://localhost:5000/api/auth/login');
    // expect(req.request.method).toBe('POST');
    // req.flush(mockUser);
  }));
  it('login test async', fakeAsync(() => {

    service.login(mockUser).subscribe((item: IUser) => {
      testItem = item
    });
    tick(10000);
    expect(mockUser).toEqual(testItem);
  }))

});
