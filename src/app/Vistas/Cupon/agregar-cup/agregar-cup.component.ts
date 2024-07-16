import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FuncionesService } from '../../../Services/funciones.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CuponInterface } from '../../../Interfaces/cupon.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agregar-cup',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './agregar-cup.component.html',
  styleUrl: './agregar-cup.component.css'
})
export class AgregarCupComponent implements OnInit {

constructor(private Funciones: FuncionesService, private form: FormBuilder, private rutas: Router){}

ngOnInit(): void {
}

@Output() cerrarModal = new EventEmitter<void>();  

Cupon = this.form.group({
   cuponCode: ['', [Validators.required]],
   porcetanjeDescuento: [0,[Validators.required]],
   descuentoMinimo: [0.0,[Validators.required]]
});

agregar(){
  const data: CuponInterface = {
    cuponCode: this.Cupon.value.cuponCode!,
    porcetanjeDescuento: this.Cupon.value.porcetanjeDescuento!,
    descuentoMinimo: this.Cupon.value.descuentoMinimo!
  };

  this.Funciones.CrearCupon(data).subscribe(() => {
    console.log("success");
    this.cerrarModal.emit();
  });
}

close(){
  this.cerrarModal.emit();
}

}
