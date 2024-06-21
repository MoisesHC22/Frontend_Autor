import { Routes } from '@angular/router';
import { HomeAutComponent } from './Vistas/Autor/home-aut/home-aut.component';
import { AgregarAutComponent } from './Vistas/Autor/agregar-aut/agregar-aut.component';
import { HomeLibComponent } from './Vistas/Libro/home-lib/home-lib.component';
import { AgregarLibComponent } from './Vistas/Libro/agregar-lib/agregar-lib.component';

export const routes: Routes = [
    {path: '', redirectTo: '/Autor', pathMatch: 'full'},
    {path: 'Autor', component: HomeAutComponent},
    {path: 'Agregar', component: AgregarAutComponent},
    {path: 'Libro',  component: HomeLibComponent},
    {path: 'Agregar_Libro', component: AgregarLibComponent}
];
