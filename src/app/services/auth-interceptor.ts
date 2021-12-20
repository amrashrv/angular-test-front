import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from './api/authorization/auth.service';
import { Router } from '@angular/router';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService,
              private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = localStorage.getItem('token');

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization',
          'Bearer ' + token)
      });
      return next.handle(cloned).pipe(
        catchError((error) => {
          if (error.status === 401) {
            return this.handleAuthError(req, next);
          }
          if (error.status === 403) {
            this.router.navigateByUrl('auth/login');
          }
          return throwError(error);
        })
      );
    }
    return next.handle(req);
  }

  handleAuthError(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.refreshToken().pipe(
      switchMap((item) => {
        this.authService.setSession(item);
        const token = localStorage.getItem('token');
        const cloned = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + token)
        });
        return next.handle(cloned);
      })
    );

  }
}
