import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AutorInterface } from '../../../Interfaces/autor.interface';
import { FuncionesService } from '../../../Services/funciones.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { AgregarAutComponent } from "../agregar-aut/agregar-aut.component";

@Component({
  selector: 'app-home-aut',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, FontAwesomeModule, AgregarAutComponent],
  templateUrl: './home-aut.component.html',
  styleUrl: './home-aut.component.css'
})

export class HomeAutComponent implements OnInit {

  faMagnifyingGlass = faMagnifyingGlass;

  constructor(private Funciones: FuncionesService, private form: FormBuilder){}

  AutorList: AutorInterface[]=[];

  ngOnInit(): void {
    this.GetAutor();
  }

  parametro = this.form.group({
    filtro: ['']
  })

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
  
  showModal = false;

  AbrirModal() {
    this.showModal = true;
  }

  CerrarModal() {
    this.showModal = false;
  }
}


