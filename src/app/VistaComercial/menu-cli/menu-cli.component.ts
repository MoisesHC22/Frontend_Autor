import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { faUser, faCartShopping} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FuncionesService } from '../../Services/funciones.service';
import { Router } from '@angular/router';
import { CarritoDeCompraComponent } from '../carrito-de-compra/carrito-de-compra.component';

@Component({
  selector: 'app-menu-cli',
  standalone: true,
  imports: [
    RouterModule, RouterOutlet, RouterLink, CommonModule, FontAwesomeModule, ReactiveFormsModule, FormsModule, CarritoDeCompraComponent
  ],
  templateUrl: './menu-cli.component.html',
  styleUrl: './menu-cli.component.css'
})
export class MenuCliComponent implements OnInit{

constructor(private form: FormBuilder, private Funciones: FuncionesService, private router: Router){}

  faUser = faUser;
  faShop = faCartShopping;
  showCarrito = false;
  parametro = this.form.group({
    filtro: ['']
  })

  ngOnInit(): void {

    this.parametro.get('filtro')?.valueChanges.subscribe(value => {

      const filtro = value ?? '';

      this.Funciones.Busqueda(filtro);
      this.router.navigate(['/Productos']);
    })
    
  }

  AbrirCarrito() {
    this.showCarrito = true;
  }

  CerrarCarrito() {
    this.showCarrito = false;
  }

 

}
