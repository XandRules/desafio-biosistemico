import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { RequestLogin } from '../models/RequestLogin';
import { ResponseLogin } from '../models/ResponseLogin';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) { }

  public doLoginService(requestLogin: RequestLogin): Observable<ResponseLogin> {
    return this.httpClient.post<ResponseLogin>
      ('http://localhost:3333/login', requestLogin)
      .pipe(tap(token => {
        localStorage.setItem('access_token', token.jwt);
        localStorage.setItem('role', token.role);
        console.log('token',token);

        this.authService.loginResponse = token;
      }));
  }
}
