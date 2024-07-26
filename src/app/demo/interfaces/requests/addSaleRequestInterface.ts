export interface AddSaleRequestInterface {
    fecha:             Date;
    fechaEntrega:      Date;
    total:             number;
    restante:          number;
    anticipo?:          number;
    metodoPago:        string;
    status:            string;
    descuento?:         number;
    envio?:             number;
    cargoDisenos?:             number;
    impuestos?:         number;
    statusPago:        string;
    cliente:           Client;
    productos:         SaleProduct[];
    imagenComprobante?: string;
    observaciones?:     string;
    guiaEnvio?:         string;
    puntoEntrega?:      string;
    urgente?:           boolean;
    vendedor:           string;
    resultado?:           string;
}

export interface Client {
    nombre:            string;
    telefono:          string;
    canalComunicacion: string;
    direccion:         Address;
}

export interface Address {
    direccion:    string;
    codigoPostal: string;
    estado:       string;
}

export interface SaleProduct {
    id:        string;
    nombre:    string;
    cantidad:  number;
    precio:    number;
    subtotal:  number;
    diseno?:    string;
    inventario?: string;
    categoria?: string;
}
