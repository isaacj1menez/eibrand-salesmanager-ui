export interface GetSaleResponseInterface {
    success: boolean;
    message: string;
    sale:    Sale;
}

export interface Sale {
    cliente:           Cliente;
    _id:               string;
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
    productos:         Producto[];
    imagenComprobante: string;
    observaciones:     string;
    guiaEnvio:         string;
    puntoEntrega:      string;
    urgente:           boolean;
    vendedor:          string;
    resultado:          string;
    createdAt:         Date;
    updatedAt:         Date;
    __v:               number;
}

export interface Cliente {
    direccion:         Direccion;
    nombre:            string;
    telefono:          string;
    canalComunicacion: string;
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
    diseno:      null | string;
    _id:         string;
    inventario?: string;
    categoria?:      string;
}
