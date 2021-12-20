import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { exhaustMap, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';

import { IUser } from '../../../interfaces/user';
import { IToken } from '../../../interfaces/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // http://localhost:5000/api
  // https://todo-list-back-angular.herokuapp.com/api
  private readonly baseUrl = 'http://localhost:5000/api';

  constructor(
    private http: HttpClient,
    private toastService: ToastService,
    private router: Router
  ) {
  }

  createMessage = (errorMessage: string): string => errorMessage ? errorMessage.substr(errorMessage.indexOf(':') + 1) : 'NO CONNECTION';

  register(body: IUser): Observable<IUser> {
    return this.http.post<IToken>(`${this.baseUrl}/auth/register`, body).pipe(
      exhaustMap(result => {
        this.setSession(result);
        return of(result);
      }),
      catchError(err => {
        this.toastService.error(this.createMessage(err.error.message));
        return of(err);
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
        this.toastService.error(this.createMessage(err.error.message));
        return of(err);
      }),
    );
  }

  logout(): void {
    localStorage.clear();
    this.router.navigateByUrl('auth/login');
  }

  refreshToken(): Observable<IToken> {
    const refreshToken = localStorage.getItem('refreshToken');
    return this.http.post<IToken>(`${this.baseUrl}/auth/refreshToken`, {refreshToken});
  }

  setSession(authResult: IToken): void {
    localStorage.setItem('token', authResult.token);
    localStorage.setItem('refreshToken', authResult.refreshToken);
    this.router.navigateByUrl('main');
  }

}
