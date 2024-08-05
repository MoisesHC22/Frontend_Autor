import { Routes } from '@angular/router';
import { HomeAutComponent } from './Vistas/Autor/home-aut/home-aut.component';
import { AgregarAutComponent } from './Vistas/Autor/agregar-aut/agregar-aut.component';
import { HomeLibComponent } from './Vistas/Libro/home-lib/home-lib.component';
import { HomeCupComponent } from './Vistas/Cupon/home-cup/home-cup.component';
import { AgregarLibComponent } from './Vistas/Libro/agregar-lib/agregar-lib.component';
import { AgregarCupComponent } from './Vistas/Cupon/agregar-cup/agregar-cup.component';
import { MenuAdmComponent } from './Vistas/menu-adm/menu-adm.component';
import { MenuCliComponent } from './VistaComercial/menu-cli/menu-cli.component';
import { HomeComponent } from './VistaComercial/home/home.component';
import { CarritoDeCompraComponent } from './VistaComercial/carrito-de-compra/carrito-de-compra.component';
import { ListaProdComponent } from './VistaComercial/Productos/lista-prod/lista-prod.component';
import { InfProductosComponent } from './VistaComercial/Productos/inf-productos/inf-productos.component';

export const routes: Routes = [
    {path: '', redirectTo: '', pathMatch: 'full'},

    {
      path: '',
      component:  MenuCliComponent,
      children: [
        {path: 'Home', component: HomeComponent},
        {path: 'Productos', component: ListaProdComponent},
        {path: 'Informacion/:id', component: InfProductosComponent},
        {path: 'Carrito', component: CarritoDeCompraComponent}
      ],
    },

    {
        path: 'admin',
        component: MenuAdmComponent,
        children: [
            {path: 'Autor', component: HomeAutComponent},
            {path: 'Agregar', component: AgregarAutComponent},
            {path: 'Libro',  component: HomeLibComponent},
            {path: 'Cupon', component: HomeCupComponent },
            {path: 'Agregar_Autor', component: AgregarAutComponent},
            {path: 'Agregar_Libro', component: AgregarLibComponent},
            {path: 'Agregar_Cupon', component: AgregarCupComponent}
        ],
      },
];