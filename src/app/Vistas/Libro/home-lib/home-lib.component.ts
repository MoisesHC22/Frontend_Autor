import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FuncionesService } from '../../../Services/funciones.service';

import { LibroInterface } from '../../../Interfaces/libro.interface';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { AgregarLibComponent } from '../agregar-lib/agregar-lib.component';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-home-lib',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, FontAwesomeModule, AgregarLibComponent, LottieComponent],
  templateUrl: './home-lib.component.html',
  styleUrl: './home-lib.component.css'
})
export class HomeLibComponent implements OnInit {

  constructor(private Funciones: FuncionesService, private form: FormBuilder){}
   
  ngOnInit(): void {
    this.GetLibros();
  }

  LibroLista: LibroInterface[]=[];
  faMagnifyingGlass = faMagnifyingGlass;
  showModal = false;
  showAnimation = false;
  animationOptions: AnimationOptions = { 
    path: '/Animaciones/ErrorCarga.json' 
  };

  parametro = this.form.group({
    filtro: ['']
  })

  ConsultaFiltro(): void{
    const filtro = this.parametro.value.filtro;

    if(filtro){
      this.Funciones.GetLibro(filtro).subscribe({
        next: (result) => {
          console.log(result);
          this.LibroLista = [result];
          this.showAnimation = false;
        },
        error: (err) => {
          this.showAnimation = true;
        }
      })
    }
  }

  GetLibros(): void{
    this.Funciones.GetLibros().subscribe({
      next: (result) => {
        console.log(result);
        this.LibroLista = result;
        this.showAnimation = false;
      },
      error: (err) => {
        console.log(err);
        this.showAnimation = true;
      }
    });
  }


  AbrirModal() {
    this.showModal = true;
  }

  CerrarModal() {
    this.showModal = false;
    this.GetLibros();
  }
}
