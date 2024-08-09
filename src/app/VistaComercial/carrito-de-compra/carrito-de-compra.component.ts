import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FuncionesService } from '../../Services/funciones.service';
import { CarritoDetalleDdto, CarritoInterface } from '../../Interfaces/Carrito.interface';
import { LibroInterface } from '../../Interfaces/libro.interface';
import { AutorInterface } from '../../Interfaces/autor.interface';
import { error, time } from 'console';
import { resolve } from 'path';
import { CuponInterface } from '../../Interfaces/cupon.interface';
import { response } from 'express';

@Component({
  selector: 'app-carrito-de-compra',
  standalone: true,
  imports: [],
  templateUrl: './carrito-de-compra.component.html',
  styleUrl: './carrito-de-compra.component.css'
})
export class CarritoDeCompraComponent implements OnInit{

constructor(private Funciones: FuncionesService){}

autor: AutorInterface []=[];
carrito: CarritoInterface = {listaDeProductos: []}
libro: LibroInterface []=[];
cupon: CuponInterface []=[];

//Información
totalCantidad: number = 0;
totalPrecio: number = 0;


ngOnInit(): void {
  this.MostrarListCarrito();
}

@Output() cerrarCarrito = new EventEmitter<void>();

MostrarListCarrito(): void{
  const carrito = this.Funciones.obtenerListaCarrito();
  
  carrito.forEach(item => {
    this.Funciones.GetLibro(item.libreriaMaterial).subscribe({
      next: (libro: LibroInterface) => {
        this.Funciones.GetAutorLibro(libro.autorLibro!).subscribe({
          next: (autor: AutorInterface) => {
            this.Funciones.GetCupon(libro.cupon!).subscribe({


              next: (response: any) =>{
                const fechaActual = new Date();
                
                const cupon = response.result;


                let precioConDescuento = libro.precioConIva!;

                if( libro.cupon! > 1)
                  {
                    console.log('entro a la validacion');
                    console.log(`libro.cupon: ${libro.cupon}, cupon.cuponId: ${cupon.cuponId}`);


                    if(Number(libro.cupon) === Number(cupon.cuponId)){

                    console.log('Si cumplio con la primera validacion');

                    if(fechaActual >= new Date(cupon.fechaInicio!) && fechaActual <= new Date(cupon.fechaExpiracion!)){

                      console.log('Si entro a todo');
                      const descuento = libro.precioConIva! * (cupon.porcetanjeDescuento! / 100);
                      precioConDescuento = libro.precioConIva! - descuento;
                    }

                    }
                  }else{
                  console.log('no entro')
                  }

                const precioTotalConDescuento = precioConDescuento * item.cantidad;

                const ListCarrito: CarritoDetalleDdto = {
                  imagen: libro.imagen,
                  libreriaMaterialId: libro.libreriaMaterialId,
                  tituloLibro: libro.titulo,
                  cantidad: item.cantidad,
                  precio: precioConDescuento,
                  precioSinDescuento: libro.precioConIva,
                  precioTotal: precioTotalConDescuento,
                  autor: `${autor.nombre} ${autor.apellido}`
                };
                this.carrito.listaDeProductos.push(ListCarrito);
                this.calculo();
              },
              error: (err) => {
                console.error('Error al obtener el cupon');
              }
            });
          },
          error: (err) => {
            console.error('Error al obtener el autor');
          }
        });
      },
      error: (err) => {
        console.error('Error al obtener el libro');
      }
    });
  });
}


Pagar(): void{
  const producto = this.carrito.listaDeProductos
  .filter(item => item.libreriaMaterialId && item.cantidad != null)
  .map(item => ({
    ProductoID: item.libreriaMaterialId!,
    cantidad: item.cantidad!
  }));

  this.Funciones.CrearCarrito(producto).subscribe({
    next: (response) => {

      this.Funciones.vaciarCarrito();
      this.calculo();
      this.MostrarListCarrito();
      this.cerrarCarrito.emit();

      console.log('Carrito guardada exitosamente:', response);
    },
    error: (err) => {
      console.error('Error al guardar el carrito:', err);
    }
   })
};


calculo(): void{
  this.totalCantidad = this.carrito.listaDeProductos.reduce((total, item) => total + item.cantidad!, 0);
  this.totalPrecio = parseFloat(this.carrito.listaDeProductos.reduce((total, item) => total + item.precioTotal!, 0).toFixed(2));
}

CambiarCantidad(id?:string, operacion?: 'aumentar' | 'disminuir'): void {

  const producto = this.carrito.listaDeProductos.find(item => item.libreriaMaterialId === id);

     if(producto){
        if(operacion === 'aumentar'){
            producto.cantidad! += 1;
        } else if (operacion === 'disminuir') {
             
          if(producto.cantidad! > 1){
            producto.cantidad! -= 1;
          } else {
            this.carrito.listaDeProductos = this.carrito.listaDeProductos.filter(item => item.libreriaMaterialId !== id);
          }
        }

        producto.precioTotal = producto.precio! * producto.cantidad!;
        this.calculo();

        this.Funciones.actualizarCarrito(id!, producto.cantidad!);
     }
}



  close(){
    this.cerrarCarrito.emit();
  }
}

