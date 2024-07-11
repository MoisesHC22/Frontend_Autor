import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AutorInterface } from '../../../Interfaces/autor.interface';
import { FuncionesService } from '../../../Services/funciones.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-aut',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './home-aut.component.html',
  styleUrl: './home-aut.component.css'
})
export class HomeAutComponent implements OnInit {

  constructor(private Funciones: FuncionesService, private form: FormBuilder, private rutas: Router){}

  parametro = this.form.group({
    filtro: ['']
  })

  AutorList: AutorInterface[]=[];


  
  ngOnInit(): void {
    this.GetAutor();
  }

  ConsultaFiltro(): void{
      const filtro = this.parametro.value.filtro;

      if(filtro){
        this.Funciones.GetAutorLibro(filtro).subscribe({
          next: (result) => {
            this.AutorList = [result];
          },
          error: (err) => {
            console.log(err);
          }
        })
      }
  }    


  GetAutor(): void{
    this.Funciones.GetAutor().subscribe({
      next: (result) => {
        this.AutorList = result;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  abrirModal(): void {
    this.rutas.navigateByUrl('/Agregar_Autor')
  }

}


