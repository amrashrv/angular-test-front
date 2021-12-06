import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IUser } from '../interfaces/user';
import { ToastService } from 'angular-toastify';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient,
              private _toastService: ToastService,
              private router: Router) {
  }
  private readonly baseUrl = 'http://localhost:5000/api';
  createMessage = (str: string) => str.substr(str.indexOf(':') + 1);

  register(body: IUser): Observable<IUser> {
    return this.http.post(`${this.baseUrl}/auth/register`, body).pipe(
      map((result: any ) => {
        this.setSession(result);
        return result.data;
      }),
      catchError(err => {
        this._toastService.error(this.createMessage(err.error.message));
        return of (err);
      }),
    );
  }
  login(body: IUser) {
    return this.http.post(`${this.baseUrl}/auth/login`, body).pipe(
      map((result: any) => {
        this.setSession(result);
        return result.data;
      }),
      catchError(err => {
        this._toastService.error(this.createMessage(err.error.message));
        return of (err);
      }),
    );
  }
  logout(){
    localStorage.clear();
    this.router.navigateByUrl('auth/login');
  }
  refreshToken(): Observable<any> {
    const refToken = localStorage.getItem('refToken');
    return this.http.post(`${this.baseUrl}/auth/refreshToken`, {refToken});
  }
  setSession(authResult: any) {
    localStorage.setItem('token', authResult.token);
    localStorage.setItem('refToken', authResult.refToken);
  }

}
