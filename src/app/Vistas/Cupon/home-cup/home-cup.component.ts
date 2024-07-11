import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CuponInterface } from '../../../Interfaces/cupon.interface';
import { FuncionesService } from '../../../Services/funciones.service';

@Component({
  selector: 'app-home-cup',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './home-cup.component.html',
  styleUrl: './home-cup.component.css'
})
export class HomeCupComponent implements OnInit {

constructor(private Funciones: FuncionesService, private form: FormBuilder ){};

CuponList: CuponInterface[]=[];

parametro = this.form.group({
  filtro: ['']
})

ngOnInit(): void {
  this.RegistrosCupon();
}

ConsultaFiltro(): void{
   const filtro = this.parametro.value.filtro;

   if(filtro){
    this.Funciones.GetByCode(filtro).subscribe({
      next: (result: CuponInterface[]) => {
        this.CuponList = result;
      },
      error: (err) => {
        console.log(err);
      }
    })
   }
}


RegistrosCupon(): void{
  this.Funciones.GetCupones().subscribe({
    next: (result: CuponInterface[]) => {
      console.log(result);
       this.CuponList = result;
    },
    error: (err) => {
      console.log(err);
    }
  })
}


}
