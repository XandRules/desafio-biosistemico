import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RegisterUser } from 'src/app/resources/models/RegisterUser';
import { AlertService } from 'src/app/resources/services/alert.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  registerUser: any;
  constructor(private httpClient: HttpClient,
    private alertService: AlertService) { }

  ngOnInit(): void {

    this.registerUser = new RegisterUser();
  }

  public registerNewUser(): void {
    this.httpClient.post("http://localhost:3333/user",
      this.registerUser).subscribe(data => {
        console.log(data);
        this.alertService.success('Cadastro Realizado!', 'Cadastro realizado com sucesso');
      },
        error => {
          this.alertService.error('Oops!', error.error.message);
        }
      );
  }

}
