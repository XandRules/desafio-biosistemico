import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Teste Desenvolvedor Angular/Node';
  loggedUser = localStorage.getItem('role');

  load(){
    this.title = 'Teste Desenvolvedor Angular/Node';
    this.loggedUser = localStorage.getItem('role');
  }

  sair(){
    localStorage.removeItem('access_token');
    localStorage.removeItem('role');
    this.loggedUser = null;
  }
}
