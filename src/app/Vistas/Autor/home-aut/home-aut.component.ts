import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AutorInterface } from '../../../Interfaces/autor.interface';
import { FuncionesService } from '../../../Services/funciones.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { AgregarAutComponent } from "../agregar-aut/agregar-aut.component";
import { LottieComponent, AnimationOptions} from "ngx-lottie"

@Component({
  selector: 'app-home-aut',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, FontAwesomeModule, AgregarAutComponent, LottieComponent],
  templateUrl: './home-aut.component.html',
  styleUrl: './home-aut.component.css'
})

export class HomeAutComponent implements OnInit {

  constructor(private Funciones: FuncionesService, private form: FormBuilder){}

  ngOnInit(): void {
    this.GetAutor();
  }

  AutorList: AutorInterface[]=[];
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
        this.Funciones.GetAutorLibro(filtro).subscribe({
          next: (result) => {
            this.AutorList = [result];
            this.showAnimation = false;
          },
          error: (err) => {
            this.showAnimation = true;
          }
        })
      }
  }    


  GetAutor(): void{
    this.Funciones.GetAutor().subscribe({
      next: (result) => {
        this.showAnimation = false;
        this.AutorList = result;
      },
      error: (err) => {
        this.showAnimation = true;
      }
    })
  }
  
  AbrirModal() {
    this.showModal = true;
  }

  CerrarModal() {
    this.showModal = false;
    this.GetAutor();
  }
}


