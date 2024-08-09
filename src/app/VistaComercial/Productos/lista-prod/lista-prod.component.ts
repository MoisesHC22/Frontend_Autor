import { Component, OnInit } from '@angular/core';
import { FuncionesService } from '../../../Services/funciones.service';
import { LibroInterface } from '../../../Interfaces/libro.interface';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { faPlus, faTag} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CarritoDeCompraComponent } from "../../carrito-de-compra/carrito-de-compra.component";

@Component({
  selector: 'app-lista-prod',
  standalone: true,
  imports: [LottieComponent, ReactiveFormsModule, FormsModule, CommonModule, FontAwesomeModule, CarritoDeCompraComponent],
  templateUrl: './lista-prod.component.html',
  styleUrl: './lista-prod.component.css'
})
export class ListaProdComponent implements OnInit {

constructor(private Funciones: FuncionesService, private rutas: Router){}
LibroLista: LibroInterface[]=[];
filtro: string = '';
showAnimation = false;
animationOptions: AnimationOptions = { 
  path: '/Animaciones/Libros.json' 
};
faPlus = faPlus;
faTag = faTag;

carrito: { libreriaMaterialId: string, cantidad: number}[] =[];

ngOnInit(): void {
  this.GetLibros();
}


GetLibros(): void{
  this.Funciones.GetLibros().subscribe({
    next: (result) => {
      this.LibroLista = result;
      this.showAnimation = false;
    }, 
    error: (err) => {
      this.showAnimation = true;
    }
  })
}

ConsultarFiltro(parametro: string): void{

  if(parametro){
    this.Funciones.Buscar(parametro).subscribe({
      next: (result) => {
        this.LibroLista = [result];
        this.showAnimation = false;
      },
      error: (err) => {
        this.showAnimation = true;
      }
    });
  } else {
    this.GetLibros();
  }

}

MasInformacion(id?: string): void{
  if(id){
    this.rutas.navigate(['/Informacion', id]);
  } else {
    console.error('No se encontro el Libro');
  }
   
   
}

AgregarAlCarrito(id?: string): void {
  this.Funciones.agregarAlCarrito(id!);
}

MostrarListCarrito(): void{
 const carrito = this.Funciones.obtenerListaCarrito();
  console.log('Contenido de carrito: ' , carrito);
}

vaciarCarrito(): void {
  this.Funciones.vaciarCarrito();
  this.MostrarListCarrito();
}

}

