import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  analyze(siteUrl): Observable<any> {
    return this.http.post(`${this.apiUrl}/analysis`, {siteUrl});
  }
}
