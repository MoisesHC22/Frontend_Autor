import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonEngine } from '@angular/ssr';
import { AutorInterface } from '../../Interfaces/autor.interface';
import { FuncionesService } from '../../Services/funciones.service';

@Component({
  selector: 'app-agregar',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './agregar.component.html',
  styleUrl: './agregar.component.css'
})
export class AgregarComponent {

form = inject(FormBuilder);
funciones = inject(FuncionesService);

Autor = this.form.group({
  nombre : ['', [Validators.required]],
  apellido: ['', [Validators.required]],
  fechaNacimiento: [  , [Validators.required]]
});

agregar(){
  console.log(this.Autor.value);
  const data: AutorInterface = {
    nombre: this.Autor.value.nombre!,
    apellido: this.Autor.value.apellido!,
    fechaNacimiento: this.Autor.value.fechaNacimiento!
  };

  this.funciones.crear(data).subscribe(() => {
     console.log("success");
  });
}


}
