export interface GetInventoriesResponseInterface {
    success:        boolean;
    inventoryItems: InventoryItem[];
}

export interface InventoryItem {
    _id:       string;
    nombre:    string;
    color:     string;
    talla:     string;
    stock:     number;
    categoria: string;
    createdAt: Date;
    updatedAt: Date;
    __v:       number;
}
