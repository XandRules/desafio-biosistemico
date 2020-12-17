import { Component, OnInit } from '@angular/core';
import { RequestLogin } from 'src/app/resources/models/RequestLogin';
import { LoginService } from 'src/app/resources/services/login.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  public requestLogin: any;
  

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {

    this.requestLogin = new RequestLogin();
  }

  public doLogin() : void {
    this.loginService.doLoginService(this.requestLogin).subscribe((data) =>{
      console.log(data);
    },
    error =>{
      console.error(error)
    }
    );
  }

}
