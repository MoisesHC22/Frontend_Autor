import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FuncionesService } from '../../../Services/funciones.service';
import { publicDecrypt } from 'crypto';
import { LibroInterface } from '../../../Interfaces/libro.interface';
import { AutorInterface } from '../../../Interfaces/autor.interface';


@Component({
  selector: 'app-agregar-lib',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './agregar-lib.component.html',
  styleUrl: './agregar-lib.component.css'
})
export class AgregarLibComponent implements OnInit{
   
  constructor(private rutas: Router, private form: FormBuilder, private funciones: FuncionesService){}
  
  Libro = this.form.group({
      titulo: ['', [Validators.required]],
      fechaPublicacion: [ , [Validators.required]],
      precio: [0.00, [Validators.required]],
      autorLibro: ['', [Validators.required]]
  });


 //Mostrar en una lista los autores para relacionar 
  AutorList: AutorInterface[]=[];

  ngOnInit(): void {
    this.GuidAutores();
  }

  GuidAutores(){
    this.funciones.GetAutor().subscribe({
      next: (result) => {
        this.AutorList = result;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


  agregar(): void{
    const data: LibroInterface ={
      titulo: this.Libro.value.titulo!,
      fechaPublicacion: new Date( this.Libro.value.fechaPublicacion!).toISOString(),
      precio: this.Libro.value.precio!,
      autorLibro: this.Libro.value.autorLibro!
    };
     
    this.funciones.crearLibro(data).subscribe(() => {
      console.log("success");  
      this.rutas.navigateByUrl('/HomeLib');
    })
  }

}
