export interface ProductRequest {
    id?:           string;
    nombre:        string;
    precio:        number;
    categoriaBase: string;
    categoria:     string;
    codigo:        string;
    descripcion:   string;
    imagen?:       string;
    stock?:        number 
}