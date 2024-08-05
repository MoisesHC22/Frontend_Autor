import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { AutorInterface } from '../Interfaces/autor.interface';
import { LibroInterface } from '../Interfaces/libro.interface';
import { CuponInterface } from '../Interfaces/cupon.interface';
import { response } from 'express';
import { CarritoInterface } from '../Interfaces/Carrito.interface';


@Injectable({
  providedIn: 'root'
})
export class FuncionesService {

  private API_Autor: string = 'https://localhost:7197';
  private API_Libro: string = 'https://localhost:7262';
  private API_Cupon: string = 'https://localhost:7178';
  private API_Carrito: string = 'https://localhost:7283';

  private datoFiltro = new BehaviorSubject<string>('');
  filtro$ = this.datoFiltro.asObservable();

  constructor(private httpClient: HttpClient ) { }

  //FiltroMenu
  Busqueda(filtro: string): void {
   this.datoFiltro.next(filtro);
  }


  // Funciones para Autor
   crear(data: AutorInterface){
      return this.httpClient.post(this.API_Autor + "/Autor/Crear", data);
   }
   
   GetAutor(): Observable<any>{
      return this.httpClient.get(this.API_Autor + "/Autor/GetAutores").pipe(res => res);
   }

   GetAutorLibro(autorLibroGuid: string): Observable<any>{
      return this.httpClient.get(this.API_Autor + "/Autor/GetAutorLibro?id=" + autorLibroGuid);
   }

   


   // Funciones para Libro

   crearLibro(data: LibroInterface){
      return this.httpClient.post(this.API_Libro + '/Libro/Crear', data);
   }

   GetLibros(): Observable<any>{
      return this.httpClient.get(this.API_Libro + '/Libro/Getlibros').pipe(res => res);
   }

   GetLibro(LibreriaMaterialId: string): Observable<any>{
      return this.httpClient.get(this.API_Libro + "/Libro/GetLibro?id=" + LibreriaMaterialId);
   }

   Buscar(dato: string): Observable<any>{
      return this.httpClient.get(this.API_Libro + "/Libro/Buscar?dato=" + dato);
   }

   



   // Funciones para Cupon
   
   GetCupones(): Observable<CuponInterface[]>{
      return this.httpClient.get<{ result: CuponInterface[] }>(this.API_Cupon + '/Cupones/GetCupones').pipe(map(response => response.result));
   }

   GetCupon(CuponId: number): Observable<any>{
     return this.httpClient.get(this.API_Cupon + '/Cupones/GetCupon?id='+ CuponId);
   }

   GetByCode(code: string): Observable<CuponInterface[]> {
      return this.httpClient.get<{ result: CuponInterface }>(`${this.API_Cupon}/Cupones/getbycode?code=${code}`).pipe(
        map(response => response.result ? [response.result] : [])
      );
    }
 
   CrearCupon(data: CuponInterface){
      return this.httpClient.post(this.API_Cupon + '/Cupones/Crear', data);
   }
   
   ActualizarCupon(data: CuponInterface){
      return this.httpClient.put(this.API_Cupon + '/Cupones/Actualizar', data);
   }


   // Funciones para Carrito
   CrearCarrito(productos: { ProductoID: string, cantidad: number}[]): Observable<any> {
   return this.httpClient.post(this.API_Carrito + '/Carrito/Nuevo', {
     ProductoLista: productos
   });
  }
  
  ObtenerCarrito(carritoId: number): Observable<CarritoInterface>
  {
   return this.httpClient.get<CarritoInterface>(this.API_Carrito + '/Carrito/Consulta?CarritoSessionId=' + carritoId)
  }



}

