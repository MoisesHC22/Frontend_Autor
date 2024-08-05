import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterModule, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { faUser, faHouse, faBook, faTicket, faWallet, faShop } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-menu-adm',
  standalone: true,
  imports: [
    RouterModule ,RouterOutlet, RouterLink, CommonModule, FontAwesomeModule
  ],
  templateUrl: './menu-adm.component.html',
  styleUrl: './menu-adm.component.css'
})

export class MenuAdmComponent {

  faHouse = faHouse;
  faUser = faUser;
  faBook = faBook;
  faTicket = faTicket;
  faWallet = faWallet;
  faShop = faShop;

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
