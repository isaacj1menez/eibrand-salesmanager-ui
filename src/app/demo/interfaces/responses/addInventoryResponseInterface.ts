export interface AddInventoryResponseInterface {
    success:       boolean;
    message:       string;
    inventoryItem: InventoryItem;
}

export interface InventoryItem {
    nombre:    string;
    color:     string;
    talla:     string;
    stock:     number;
    categoria: string;
    _id:       string;
    createdAt: Date;
    updatedAt: Date;
    __v:       number;
}
