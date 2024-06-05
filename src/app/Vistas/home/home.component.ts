import { Component, OnInit, inject } from '@angular/core';
import { AutorInterface } from '../../Interfaces/autor.interface';
import { FuncionesService } from '../../Services/funciones.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Console } from 'console';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit{

  form = inject(FormBuilder);

  parametro = this.form.group({
    filtro: ['']
  })

  AutorList: AutorInterface[]=[];

  constructor(private Funciones: FuncionesService){}


  ngOnInit(): void {
    this.GetAutor();
  }

  ConsultaFiltro(){
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


  GetAutor(){
    this.Funciones.GetAutor().subscribe({
      next: (result) => {
        this.AutorList = result;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


}
