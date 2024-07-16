import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FuncionesService } from '../../../Services/funciones.service';

import { LibroInterface } from '../../../Interfaces/libro.interface';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { AgregarLibComponent } from '../agregar-lib/agregar-lib.component';

@Component({
  selector: 'app-home-lib',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, FontAwesomeModule, AgregarLibComponent],
  templateUrl: './home-lib.component.html',
  styleUrl: './home-lib.component.css'
})
export class HomeLibComponent implements OnInit {

  faMagnifyingGlass = faMagnifyingGlass;

  constructor(private Funciones: FuncionesService, private form: FormBuilder){}
   
  LibroLista: LibroInterface[]=[];

  ngOnInit(): void {
    this.GetLibros();
  }

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
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }

  GetLibros(): void{
    this.Funciones.GetLibros().subscribe({
      next: (result) => {
        console.log(result);
        this.LibroLista = result;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  
  showModal = false;

  AbrirModal() {
    this.showModal = true;
  }

  CerrarModal() {
    this.showModal = false;
  }
}
