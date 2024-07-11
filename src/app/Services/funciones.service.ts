import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { AutorInterface } from '../Interfaces/autor.interface';
import { LibroInterface } from '../Interfaces/libro.interface';
import { CuponInterface } from '../Interfaces/cupon.interface';
import { response } from 'express';


@Injectable({
  providedIn: 'root'
})
export class FuncionesService {

  API_Autor: string = 'https://localhost:7197';
  API_Libro: string = 'https://localhost:7262';
  API_Cupon: string = 'https://localhost:7178';

  constructor(private httpClient: HttpClient) { }


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


}

