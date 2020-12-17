import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestLogin } from '../models/RequestLogin';
import { ResponseLogin } from '../models/ResponseLogin';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  public doLoginService(requestLogin: RequestLogin) : Observable<ResponseLogin>{
      return this.httpClient.post<ResponseLogin>('http://localhost:3333/login', requestLogin);
  }
}
