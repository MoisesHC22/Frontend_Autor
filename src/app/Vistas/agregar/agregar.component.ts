import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AutorInterface } from '../../Interfaces/autor.interface';
import { FuncionesService } from '../../Services/funciones.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './agregar.component.html',
  styleUrl: './agregar.component.css'
})
export class AgregarComponent {

rutas = inject(Router);
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
     this.rutas.navigateByUrl('/Home');
  });
}


}
