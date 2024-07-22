import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FuncionesService } from '../../../Services/funciones.service';
import { LibroInterface } from '../../../Interfaces/libro.interface';
import { AutorInterface } from '../../../Interfaces/autor.interface';
import { read } from 'node:fs';


@Component({
  selector: 'app-agregar-lib',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './agregar-lib.component.html',
  styleUrl: './agregar-lib.component.css'
})
export class AgregarLibComponent implements OnInit{
   
  constructor(private rutas: Router, private form: FormBuilder, private funciones: FuncionesService){}
  
  ngOnInit(): void {
    this.GuidAutores();
  }

  @Output() cerrarModal = new EventEmitter<void>();

  Libro = this.form.group({
      titulo: ['', [Validators.required]],
      fechaPublicacion: [ , [Validators.required]],
      precio: [0.00, [Validators.required]],
      autorLibro: ['', [Validators.required]],
      imagen: [null as string | null]
  });

 //Mostrar en una lista los autores para relacionar 
  AutorList: AutorInterface[]=[];
  imagenURL: string | ArrayBuffer | null = null;
 imagenSeleccionada = false;

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
      autorLibro: this.Libro.value.autorLibro!,
      imagen: this.Libro.value.imagen!
    };
     
    this.funciones.crearLibro(data).subscribe(() => {
      console.log("success");  
      this.cerrarModal.emit();
    })
  }

  CargarImagen(event: Event){
    const input = event.target as HTMLInputElement;
    
    if(input.files && input.files[0]) {
      const file = input.files[0];
      const render = new FileReader();

      render.onload = () => {
        this.imagenURL = render.result;

      const base64string = render.result as string;
      const base64Index = base64string.indexOf('base64') + 7;
      const base64Data = base64string.substring(base64Index); 

        this.Libro.patchValue({
          imagen: base64Data
        });

        this.imagenSeleccionada = true;
      };
      render.readAsDataURL(file);
    }

  }


  clickFileInput() {
    const fileInput = document.getElementById('imagenLibro') as HTMLInputElement;
    fileInput.click();
  }

  close(){
    this.cerrarModal.emit();
  }

}
