import { Component, OnInit } from '@angular/core';
import { FuncionesService } from '../../../Services/funciones.service';
import { LibroInterface } from '../../../Interfaces/libro.interface';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { faCartPlus} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AutorInterface } from '../../../Interfaces/autor.interface';

@Component({
  selector: 'app-inf-productos',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './inf-productos.component.html',
  styleUrl: './inf-productos.component.css'
})
export class InfProductosComponent implements OnInit {
  
  faCartPlus = faCartPlus;
  id: string = '';

  ngOnInit(): void {
     this.id = String(this.route.snapshot.paramMap.get('id'));
     this.GetLibro(this.id);    
  }

constructor(private Funciones: FuncionesService, private route: ActivatedRoute){}
Libro: LibroInterface = {}
autor: AutorInterface = {}

  GetLibro(Id: string): void{
  if(Id){
    this.Funciones.GetLibro(Id).subscribe({
      next: (result: LibroInterface) => {
        this.Libro = result;

        if(this.Libro.autorLibro) {
          this.Funciones.GetAutorLibro(this.Libro.autorLibro).subscribe({
            next: (autorResult: AutorInterface) => {
              this.autor = autorResult;
            },
            error: (err) => {
              console.log('Error al obtener el autor:', err);
            }
          });
        }
      },
      error: (err) => {
        console.log('Error al obtener el libro:', err);
      }
    });
  }
}

AgregarAlCarrito(id?: string): void {
  this.Funciones.agregarAlCarrito(id!);
}


}
