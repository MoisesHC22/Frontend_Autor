import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AutorInterface } from '../Interfaces/autor.interface';
import { LibroInterface } from '../Interfaces/libro.interface';

@Injectable({
  providedIn: 'root'
})
export class FuncionesService {

  API_Autor: string = 'https://localhost:7197';
  API_Libro: string = 'https://localhost:7262';

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

   GetLibro(): Observable<any>{
      return this.httpClient.get(this.API_Libro + '/Libro/Getlibros').pipe(res => res);
   }

   GetLibros(LibreriaMaterialId: string): Observable<any>{
      return this.httpClient.get(this.API_Libro + "/Autor/GetLibro?id=" + LibreriaMaterialId);
   }

}

