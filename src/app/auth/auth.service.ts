import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {LoginModel} from './models/login.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {}

  private apiUrl = environment.apiUrl;

  public isAuthenticated = false;

  login(email, password): Observable<LoginModel> {
    return this.http.post<LoginModel>(`${this.apiUrl}/auth/login`, {email, password});
  }

  getToken(): string {
    return localStorage.getItem('ACCESS_TOKEN');
  }

  getRefreshToken(): string {
    return localStorage.getItem('REFRESH_TOKEN');
  }

  saveToken(token): void {
    localStorage.setItem('ACCESS_TOKEN', token);
  }

  saveRefreshToken(refreshToken): void {
    localStorage.setItem('REFRESH_TOKEN', refreshToken);
  }

  removeToken(): void {
    localStorage.removeItem('ACCESS_TOKEN');
  }

  removeRefreshToken(): void {
    localStorage.removeItem('REFRESH_TOKEN');
  }

  getUserData(): string {
    return localStorage.getItem('USER');
  }

  saveUserData(user): void {
    localStorage.setItem('USER', JSON.stringify(user));
  }

  clearUserData(): void {
    localStorage.removeItem('USER');
  }

  clearAuthSession(): void {
    this.removeRefreshToken();
    this.removeToken();
    this.clearUserData();
  }

  redirectToLoginPage(): void {
    this.router.navigate(['/auth/login']);
  }

}
