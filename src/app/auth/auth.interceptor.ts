import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Observable, of, throwError} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  userCredentials = this.authService.getUserCredentials();

  request;

  constructor(private authService: AuthService, private http: HttpClient) {
  }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.userCredentials) {
      return next.handle(this.addToken(request)).pipe(catchError(error => {

        if (error.status === 400) {
          return throwError(error);

        } else if (error.status === 401 && error.error.message === 'Not authenticated') {

          return this.getRefreshToken(request, next);

        } else if (error.status === 401 && error.error.message === 'Refresh token is expired.') {

          this.authService.logoutUser();
          this.authService.redirectToLoginPage();

          return throwError(error);
        } else {
          return throwError(error);
        }
      })
      );
    } else {
      return next.handle(request).pipe(catchError((error) => {
        this.authService.redirectToLoginPage();
        return throwError(error);
      }));

    }
  }

  private addToken(request: HttpRequest<any>): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.userCredentials.accessToken}`
      }
    });
  }

  private getRefreshToken(request, next): Observable<any> {
    return this.http.post<any>('http://localhost:5000/auth/token', {
      token: this.userCredentials.refreshToken
    }).pipe(catchError(() => {

        this.authService.logoutUser();

        this.authService.redirectToLoginPage();

        return of(false);
      }),
      switchMap((accessToken: any) => {

        this.userCredentials.accessToken = accessToken.accessToken;
        this.authService.setUserCredentials(this.userCredentials);

        this.request = request.clone({headers: request.headers.set('Authorization', `Bearer ${accessToken.accessToken}`)});
        return next.handle(this.request);
      })
    );
  }
}

