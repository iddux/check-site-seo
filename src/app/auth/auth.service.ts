import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {LoginRequest} from './requests/login.request';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {
  }

  private apiUrl = environment.apiUrl;

  login(email, password): Observable<LoginRequest> {
    return this.http.post<LoginRequest>(`${this.apiUrl}/auth/login`, {email, password}).pipe(
      map((res) => {

        this.setUserCredentials(res);
        return res;
      }), catchError(err => {
        return throwError(err);

      }));
  }

  signUp(username, email, password, confirmPassword): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/auth/signup`, {username, email, password, confirmPassword});
  }

  setUserCredentials(credentials): void {
    localStorage.setItem('USER_CREDENTIALS', JSON.stringify(credentials));
  }

  getUserCredentials(): any {
    try {

      return JSON.parse(localStorage.getItem('USER_CREDENTIALS'));
    } catch (e) {

      return false;
    }
  }

  logoutUser(): void {
    localStorage.removeItem('USER_CREDENTIALS');
  }

  saveToken(token): void {
    localStorage.setItem('ACCESS_TOKEN', token);
  }

  redirectToLoginPage(): void {
    this.router.navigate(['/auth/login']);
  }
}
