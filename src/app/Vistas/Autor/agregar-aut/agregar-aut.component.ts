import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AutorInterface } from '../../../Interfaces/autor.interface';
import { FuncionesService } from '../../../Services/funciones.service';
import { Router } from '@angular/router';
import { read } from 'node:fs';

@Component({
  selector: 'app-agregar-aut',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './agregar-aut.component.html',
  styleUrl: './agregar-aut.component.css'
})

export class AgregarAutComponent implements OnInit {

  constructor(private Funciones: FuncionesService, private form: FormBuilder, private rutas: Router){}
  
   ngOnInit(): void {
   }

  @Output() cerrarModal = new EventEmitter<void>();  

  Autor = this.form.group({
    nombre : ['', [Validators.required]],
    apellido: ['', [Validators.required]],
    fechaNacimiento: [  , [Validators.required]],
    imagen: [null as string | null]
  });

  agregar(){
    const data: AutorInterface = {
      nombre: this.Autor.value.nombre!,
      apellido: this.Autor.value.apellido!,
      fechaNacimiento: this.Autor.value.fechaNacimiento!,
      imagen: this.Autor.value.imagen!
    };
  
    this.Funciones.crear(data).subscribe(() => {
       console.log("success");
       this.cerrarModal.emit();
       
    });
  }

  CargarImagen(event: Event){
    const input = event.target as HTMLInputElement;
    
    if(input.files && input.files[0]) {
      const file = input.files[0];
      const render = new FileReader();

      render.onload = () => {
        let base64string = render.result as string;

      const base64Index = base64string.indexOf('base64') + 7;
      base64string = base64string.substring(base64Index); 

        this.Autor.patchValue({
          imagen: base64string
        });
      };
      render.readAsDataURL(file);
    }

  }

  close(){
    this.cerrarModal.emit();
  }

}
