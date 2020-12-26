import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginResponse} from '../interfaces/login.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(email, password): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, {email, password});
  }

}
