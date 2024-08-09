export interface CarritoInterface {
  carritoId?: number;
  fechaCreacionSesion?: Date;
  listaDeProductos: CarritoDetalleDdto[];
}

export interface CarritoDetalleDdto {
    libreriaMaterialId?: string;
    tituloLibro?: string;
    autorLibro?: string;
    fechaPublicacion?: Date;
    imagen?: string;
    autor?: string;
    precio?: number;
    precioSinDescuento?: number;
    cantidad?: number;
    precioTotal?: number;
}