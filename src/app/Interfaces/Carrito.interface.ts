export interface CarritoInterface {
  carritoId?: number;
  fechaCreacionSesion?: Date;
  listaDeProductos: CarritoDetalleDdto[];
}

export interface CarritoDetalleDdto {
    libroId?: string;
    tituloLibro?: string;
    autorLibro?: string;
    fechaPublicacion?: Date;
    imagen?: string;
    autor?: string;
    precio?: number;
    cantidad?: number;
    precioTotal?: number;
}