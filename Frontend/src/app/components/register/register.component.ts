import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RegisterPeople } from 'src/app/resources/models/RegisterPeople';
import { AlertService } from 'src/app/resources/services/alert.service';
import { AuthService } from 'src/app/resources/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  Roles: any = ['Administrador', 'Técnico', 'Proprietário'];

  registerPeople: any;
  token: any;

  constructor(private httpClient: HttpClient,
    private alertService: AlertService,
    private authService: AuthService) { }

  ngOnInit() {

    this.registerPeople = new RegisterPeople();
    this.token = this.authService.token;
  }


  public registerNewPeople(): void {
    this.httpClient.post("http://localhost:3333/people",
      this.registerPeople).subscribe(data => {
        console.log(data);
        this.registerPeople = null;
        console.log(this.registerPeople);
        this.alertService.success('Cadastro Realizado!', 'Cadastro realizado com sucesso');
      },
        error => {
          this.alertService.error('Oops!', error.error.message);
        }
      );
  }

}