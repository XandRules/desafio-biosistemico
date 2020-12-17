import { Injectable } from '@angular/core';
import { ResponseLogin } from '../models/ResponseLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public loginResponse?: ResponseLogin;

  public clear(): void {
    this.loginResponse = undefined;
    localStorage.removeItem('access_token');
  }

  isLogged(): boolean {
    return Boolean(localStorage.getItem('access_token'));
  }

  public isAuthenticated(): boolean {
    return Boolean(this.isLogged())
  }

}
