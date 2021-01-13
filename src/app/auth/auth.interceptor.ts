import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  currentUser = this.authService.getUserData();
  accessToken = this.authService.getToken();
  refreshToken = this.authService.getRefreshToken();

  constructor(private authService: AuthService, private router: Router) {
  }
  // TODO Handle refresh token in auth, change access token expired time
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.currentUser && this.accessToken) {
      return next.handle(this.addToken(request)).pipe(catchError(error => {
        return throwError(error);
      }));

    } else {
      return next.handle(request).pipe(catchError(error => {

        if (error.status === 403) {
          this.authService.clearAuthSession();
          this.authService.redirectToLoginPage();
        }

        return throwError(error);
      }));
    }
  }

  private addToken(request: HttpRequest<any>): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.accessToken}`
      }
    });
  }
}

