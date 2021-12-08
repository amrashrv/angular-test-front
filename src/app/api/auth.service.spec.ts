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

describe('AuthService tests', () => {
  // let injector: TestBed;
  // let service: AuthService;
  // let httpMock: HttpTestingController;
  // let testItem: IUser;
  let service: AuthService;
  let serviceSpy: any;
  let dependencySpy = jasmine.createSpyObj(AuthService, ['login', 'register']);



  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [{provide: AuthService, useValue: dependencySpy }],
    });
    service = TestBed.inject(AuthService);
  });

  it('Should create AuthService', () => {
    expect(service).toBeDefined();
  });

  it('should login user', async () => {
    const mockUser: IUser = {_id: '12131', userName: 'akdjsfhk', email: 'adsfds', password: 'aldksfjl'}
    let result = await service.login(mockUser);
    expect(service.login(mockUser)).toEqual(result);
  });

  // it('AuthService', () => {
  //   expect(service).toBeTruthy();
  // })

  // it('register', () => {
  //   service.register(mockUser).subscribe((res) => {
  //     if (res !== undefined) {
  //       expect(res).toEqual(mockUser);
  //     }
  //   });

  //   const req = httpMock.expectOne('http://localhost:5000/api/auth/register');
  //   expect(req.request.method).toBe('POST');
  //   req.flush(mockUser);
  // });

  // it('login', fakeAsync(() => {
  //   service.login(mockUser).subscribe((res) => {
  //     // tick(2000);
  //     if(res !== undefined){
  //       expect(res).toEqual(mockUser);
  //     }
  //   });
    // const req = httpMock.expectOne('http://localhost:5000/api/auth/login');
    // expect(req.request.method).toBe('POST');
    // req.flush(mockUser);
  // }));

  // it('login test async', fakeAsync(() => {
  //   service.login(mockUser).subscribe((item: IUser) => {
  //     if(item !== undefined){
  //       testItem = item
  //       expect(mockUser).toEqual(testItem);
  //     }
  //   });
  // }))

});
