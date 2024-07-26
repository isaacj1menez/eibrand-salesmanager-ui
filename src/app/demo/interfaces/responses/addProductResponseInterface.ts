export interface AddProductResponseInterface {
    success: boolean;
    message: string;
    product: Product;
    errors?:  string[];
}

export interface Product {
    nombre:      string;
    precio:      number;
    stock:       number;
    categoria:   string;
    imagen:      string;
    codigo:      string;
    descripcion: string;
    _id:         string;
    createdAt:   Date;
    updatedAt:   Date;
    __v:         number;
}
