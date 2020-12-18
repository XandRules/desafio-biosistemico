import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  Roles: any = ['Administrador', 'Técnico', 'Proprietário'];

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {

    this.httpClient.get('http://localhost:3333/register').subscribe((data)=> {
      console.log(data);
    });
  }

}