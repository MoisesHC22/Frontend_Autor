import { Component } from '@angular/core';
import { FuncionesService } from '../../Services/funciones.service';
import { CarritoDetalleDdto, CarritoInterface } from '../../Interfaces/Carrito.interface';

@Component({
  selector: 'app-carrito-de-compra',
  standalone: true,
  imports: [],
  templateUrl: './carrito-de-compra.component.html',
  styleUrl: './carrito-de-compra.component.css'
})
export class CarritoDeCompraComponent {

constructor(private Funciones: FuncionesService){}

Lista: CarritoDetalleDdto[]=[];

Pagar(): void {
  };
}

