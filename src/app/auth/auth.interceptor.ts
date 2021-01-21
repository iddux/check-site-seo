import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Observable, of, throwError} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  currentUser = this.authService.getUserData();
  accessToken = this.authService.getToken();
  refreshToken = this.authService.getRefreshToken();
  request;

  constructor(private authService: AuthService, private http: HttpClient) {
  }

  // TODO Handle refresh token in auth, change access tokaen expired time
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.currentUser && this.accessToken){
      return next.handle(this.addToken(request)).pipe(catchError(error => {

        if (error.status === 400) {
            return throwError(error);
        } else if (error.status === 401 && error.error.message === 'Not authenticated') {
          return this.getRefreshToken(request, next);
        } else if (error.status === 401 && error.error.message === 'Refresh token is expired.') {
          this.authService.redirectToLoginPage();
          return throwError(error);
        } else {
          return throwError(error);
        }
      }));
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
        Authorization: `Bearer ${this.accessToken}`
      }
    });
  }

  private getRefreshToken(request, next): Observable<any> {
    return this.http.post<any>('http://localhost:5000/auth/token', {
      token: this.refreshToken
    }).pipe(catchError(() => {
      //to nie działa
        this.authService.clearAuthSession();
        this.authService.redirectToLoginPage();

        return of(false);
      }),
      switchMap((accessToken: any) => {
        this.authService.saveToken(accessToken.accessToken);
        this.request = request.clone({headers: request.headers.set('Authorization', `Bearer ${accessToken.accessToken}`)});
        // Return true
        console.log(this.request);
        return next.handle(this.request);
      })
    );
  }
}

