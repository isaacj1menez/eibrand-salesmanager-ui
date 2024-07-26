export interface GetProductsResponseInterface {
    success:  boolean;
    message:  string;
    products: Product[];
}

export interface Product {
    _id:            string;
    nombre:         string;
    precio:         number;
    categoriaBase:  string;
    categoria:      string;
    diseno:         string;
    codigo:         string;
    descripcion:    string;
    createdAt:      Date;
    updatedAt:      Date;
    stock?:         number;    
    __v:            number;
}
