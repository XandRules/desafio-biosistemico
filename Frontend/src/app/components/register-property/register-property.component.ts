import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RegisterProperty } from 'src/app/resources/models/RegisterProperty';
import { AlertService } from 'src/app/resources/services/alert.service';

@Component({
  selector: 'app-register-property',
  templateUrl: './register-property.component.html',
  styleUrls: ['./register-property.component.css']
})
export class RegisterPropertyComponent implements OnInit {

  registerProperty: any;

  constructor(private httpClient: HttpClient,
    private alertService: AlertService) { }

  ngOnInit(): void {
    this.registerProperty = new RegisterProperty();
  }

  public registerNewProperty(): void{
    this.httpClient.post("http://localhost:3333/property",
    this.registerProperty).subscribe(data =>{
      console.log(data);
      this.alertService.success('Cadastro Realizado!', 'Cadastro realizado com sucesso');
    },
    error => {
      this.alertService.error('Oops!', error.error.message);
    }
    );
  }

}
