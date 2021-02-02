import { Injectable } from '@angular/core';
import {CanLoad, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private authService: AuthService, private router: Router) {}

  canLoad(): Observable<boolean>|Promise<boolean>|boolean {
    if (this.authService.getUserCredentials()) {
      return true;

    } else {

      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}
