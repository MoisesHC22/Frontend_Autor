import { Component, OnInit } from '@angular/core';
import { FuncionesService } from '../../../Services/funciones.service';
import { LibroInterface } from '../../../Interfaces/libro.interface';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-prod',
  standalone: true,
  imports: [LottieComponent, ReactiveFormsModule, FormsModule, CommonModule],
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

carrito: { libreriaMaterialId: string, cantidad: number}[] =[];

ngOnInit(): void {
  this.GetLibros();
  this.Funciones.filtro$.subscribe(filtro => {
    this.filtro = filtro;
    this.ConsultarFiltro(filtro);

    const carritoGuardado = localStorage.getItem('carrito');
    if( carritoGuardado){
      this.carrito = JSON.parse(carritoGuardado);
    }else{
      this.carrito = [];
    }
  })
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
   this.rutas.navigate(['/Informacion', id]);
}

AgregarAlCarrito(id?: string): void{

  if(id){
    const productoExistente = this.carrito.find(item => item.libreriaMaterialId === id);

      if(productoExistente){
        productoExistente.cantidad += 1;
      } else {
        this.carrito.push({libreriaMaterialId: id, cantidad: 1});
      }

      localStorage.setItem('carrito', JSON.stringify(this.carrito));
      
      console.log(this.carrito);
  }
 }

}
