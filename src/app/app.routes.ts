import { Routes } from '@angular/router';
import { HomeComponent } from './Vistas/home/home.component';
import { AgregarComponent } from './Vistas/agregar/agregar.component';

export const routes: Routes = [
    {path: 'Home', component: HomeComponent},
    {path: 'Agregar', component: AgregarComponent}
];