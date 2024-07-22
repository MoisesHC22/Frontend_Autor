import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CuponInterface } from '../../../Interfaces/cupon.interface';
import { FuncionesService } from '../../../Services/funciones.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { AgregarCupComponent } from "../agregar-cup/agregar-cup.component";
import { LottieComponent, AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-home-cup',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, FontAwesomeModule, AgregarCupComponent, LottieComponent],
  templateUrl: './home-cup.component.html',
  styleUrl: './home-cup.component.css'
})
export class HomeCupComponent implements OnInit {

  constructor(private Funciones: FuncionesService, private form: FormBuilder ){};

  ngOnInit(): void {
    this.RegistrosCupon();
  }

  CuponList: CuponInterface[]=[];
  faMagnifyingGlass = faMagnifyingGlass;
  showModal = false;
  showAnimation = false;
  animationOptions: AnimationOptions = { 
    path: '/Animaciones/ErrorCarga.json' 
  };

  parametro = this.form.group({
    filtro: ['']
  })



ConsultaFiltro(): void{
   const filtro = this.parametro.value.filtro;

   if(filtro){
    this.Funciones.GetByCode(filtro).subscribe({
      next: (result: CuponInterface[]) => {
        this.CuponList = result;
        this.showAnimation = false;
      },
      error: (err) => {
        this.showAnimation = true;
      }
    })
   }
}


RegistrosCupon(): void{
  this.Funciones.GetCupones().subscribe({
    next: (result: CuponInterface[]) => {
      console.log(result);
       this.CuponList = result;
       this.showAnimation = false;
    },
    error: (err) => {
      this.showAnimation = true;
    }
  })
}

AbrirModal() {
  this.showModal = true;
}

CerrarModal() {
  this.showModal = false;
  this.RegistrosCupon();
}

}
