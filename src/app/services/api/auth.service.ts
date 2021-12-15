import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { exhaustMap, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';

import { IUser } from '../../interfaces/user';
import { IToken } from '../../interfaces/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrltest = 'https://todo-list-back-angular.herokuapp.com/api';
  private readonly baseUrl = 'http://localhost:5000/api';
  existErrorMessage: any = '';
  constructor(
    private http: HttpClient,
    private _toastService: ToastService,
    private router: Router
  ) {
  }

  createMessage = (str: string) => str.substr(str.indexOf(':') + 1);

  register(body: IUser): Observable<IUser> {
    return this.http.post<IToken>(`${this.baseUrl}/auth/register`, body).pipe(
      map(result => {
        this.setSession(result);
        return result;
      }),
      catchError(err => {
        if (err.status === 403){
          this.existErrorMessage = err.error.message;
          return of(err);
        } else {
          this._toastService.error(this.createMessage(err.error.message));
          return of(err);
        }
      }),
    );
  }

  login(body: IUser) {
    return this.http.post<IToken>(`${this.baseUrl}/auth/login`, body).pipe(
      exhaustMap(result => {
        this.setSession(result);
        return of(result);
      }),
      catchError(err => {
        this._toastService.error(this.createMessage(err.error.message));
        return of(err);
      }),
    );
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('auth/login');
  }

  refreshToken(): Observable<IToken> {
    const refToken = localStorage.getItem('refToken');
    return this.http.post<IToken>(`${this.baseUrl}/auth/refreshToken`, {refToken});
  }

  setSession(authResult: IToken) {
    localStorage.setItem('token', authResult.token);
    localStorage.setItem('refToken', authResult.refToken);
    this.router.navigateByUrl('main');
  }

}
