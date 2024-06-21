import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterModule } from '@angular/router';

import { AgregarAutComponent } from './Vistas/Autor/agregar-aut/agregar-aut.component';
import { HomeAutComponent } from './Vistas/Autor/home-aut/home-aut.component';

import { AgregarLibComponent } from './Vistas/Libro/agregar-lib/agregar-lib.component';
import { HomeLibComponent } from './Vistas/Libro/home-lib/home-lib.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule ,RouterOutlet, RouterLink, 
    AgregarAutComponent, HomeAutComponent, 
    AgregarLibComponent, HomeLibComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FrontEndLibro';
}
