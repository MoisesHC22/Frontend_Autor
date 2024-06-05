import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AutorInterface } from '../Interfaces/autor.interface';

@Injectable({
  providedIn: 'root'
})
export class FuncionesService {

  API: string = 'https://localhost:7197';

  constructor(private httpClient: HttpClient) { }

   crear(data: AutorInterface){
      return this.httpClient.post(this.API + "/Autor/Crear", data);
   }


   
   GetAutor(): Observable<any>{
      return this.httpClient.get(this.API + "/Autor/GetAutores").pipe(res => res);
   }

   GetAutorLibro(autorLibroGuid: string): Observable<any>{
      return this.httpClient.get(this.API + "/Autor/GetAutorLibro?id=" + autorLibroGuid);
   }

}

