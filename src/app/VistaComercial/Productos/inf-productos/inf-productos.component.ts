import { Component, OnInit } from '@angular/core';
import { FuncionesService } from '../../../Services/funciones.service';
import { LibroInterface } from '../../../Interfaces/libro.interface';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inf-productos',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './inf-productos.component.html',
  styleUrl: './inf-productos.component.css'
})
export class InfProductosComponent implements OnInit {
  
  id: string = '';

  ngOnInit(): void {
     this.id = String(this.route.snapshot.paramMap.get('id'));
     this.GetLibro(this.id);    
  }

constructor(private Funciones: FuncionesService, private route: ActivatedRoute){}
Libro: LibroInterface[]=[];

  GetLibro(Id: string): void{
  if(Id){
    this.Funciones.GetLibro(Id).subscribe({
      next: (result) => {
        this.Libro = [result];
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}


}
