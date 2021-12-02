import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUser } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {
  }
  private readonly baseUrl = 'http://localhost:5000/api';

  register(body: IUser): Observable<IUser> {
    return this.http.post(`${this.baseUrl}/auth/register`, body).pipe(
      map((result: any ) => {
        this.setSession(result);
        return result.data;
      })
    );
  }
  login(body: any){
    return this.http.post(`${this.baseUrl}/auth/login`, body).pipe(
      map((result: any) => {
        this.setSession(result);
        return result.data;
      })
    );
  }
  logout(){
    localStorage.clear();
  }
  private setSession(authResult: any) {
    localStorage.setItem('token', authResult.token);
    localStorage.setItem('refToken', authResult.refToken);
  }
}
