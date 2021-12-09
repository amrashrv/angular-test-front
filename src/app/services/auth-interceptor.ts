import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../api/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {

    const token = localStorage.getItem('token');

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization',
          'Bearer ' + token)
      });
      return next.handle(cloned).pipe(
        catchError(() => {
          return this.handleAuthError(req, next);
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
          headers: req.headers.set('Authorization',
            'Bearer ' + token)
        });
        return next.handle(cloned);
      })
    );
  }
}
