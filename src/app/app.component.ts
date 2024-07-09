import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { faUser, faHouse, faBook, faTicket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule ,RouterOutlet, RouterLink, CommonModule, FontAwesomeModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  faHouse = faHouse;
  faUser = faUser;
  faBook = faBook;
  faTicket = faTicket;

  title= "Hola";
  

}
