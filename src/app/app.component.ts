import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterModule, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { faUser, faHouse, faBook, faTicket, faWallet, faShop } from '@fortawesome/free-solid-svg-icons'
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
  faWallet = faWallet;
  faShop = faShop;

  title= "Hola";
  
  currentRoute: string = '';

  constructor(private router: Router){
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
      }
    });
  }


  isActive(route: string): boolean {
    return this.currentRoute === route;
  }

}
