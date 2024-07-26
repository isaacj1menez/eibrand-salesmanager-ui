export interface AddSaleResponseInterface {
    success: boolean;
    message: string;
    sale:    Sale;
    errors?: string[] | string;
}

export interface Sale {
    fecha:             Date;
    fechaEntrega:      Date;
    total:             number;
    anticipo:          number;
    restante:          number;
    metodoPago:        string;
    status:            string;
    descuento:         number;
    envio:             number;
    cargoDisenos:      number;
    impuestos:         number;
    statusPago:        string;
    cliente:           Cliente;
    productos:         Producto[];
    imagenComprobante: string;
    observaciones:     string;
    guiaEnvio:         string;
    puntoEntrega:      string;
    urgente:           boolean;
    vendedor:          string;
    _id:               string;
    createdAt:         Date;
    updatedAt:         Date;
    __v:               number;
}

export interface Cliente {
    nombre:            string;
    telefono:          string;
    canalComunicacion: string;
    direccion:         Direccion;
}

export interface Direccion {
    direccion:    string;
    codigoPostal: string;
    estado:       string;
}

export interface Producto {
    id:          string;
    nombre:      string;
    cantidad:    number;
    precio:      number;
    subtotal:    number;
    _id:         string;
    inventario?: string;
    talla?:      string;
}
