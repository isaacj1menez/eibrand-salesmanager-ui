import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { ProductRequest } from 'src/app/demo/interfaces/requests/productRequestInterface';
import { GetProductsResponseInterface, Product } from 'src/app/demo/interfaces/responses/getProductsResponseInterface';
import { FileUploadService } from 'src/app/demo/service/file-upload.service';
import { ProductService } from 'src/app/demo/service/product.service';
import { NgForm } from '@angular/forms';
import { FileUploadResponseInterface } from 'src/app/demo/interfaces/responses/fileUploadResponseInterface';
import { AddProductResponseInterface } from 'src/app/demo/interfaces/responses/addProductResponseInterface';
import { GetInventoriesResponseInterface, InventoryItem } from 'src/app/demo/interfaces/responses/getInventoriesResponseInterface';
import { InventoryService } from 'src/app/demo/service/inventory.service';
import { Table } from 'primeng/table';

@Component({
  templateUrl: './list-product.component.html',
  providers: [ConfirmationService, MessageService]
})
export class ListProductComponent implements OnInit {
  @ViewChild('productImage') fileUpload: FileUpload;
  uploadedFile: File | null = null;

  categorias: string[] = ["Souvenirs", "Contenedores", "Textiles"];

  uploading: boolean = false;

  errorMessages: Message[] = [];

  product: ProductRequest = {
    id: '',
    nombre: '',
    precio: null,
    categoriaBase: '',
    categoria: '',
    codigo: '',
    descripcion: '',
    imagen: ''
  };

  stockCategories: any[] = [
    { label: 'Taza', value: 'taza' },
    { label: 'Vaso', value: 'vaso' },
    { label: 'Playera', value: 'playera' },
    { label: 'Marco', value: 'marco' }
  ]

  products: Product[];
  response: GetProductsResponseInterface;
  inventories: InventoryItem[];

  isEditVisible: boolean = false;



  constructor(private productService: ProductService,
    private inventoryService: InventoryService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private fileUploadService: FileUploadService) { }

  async ngOnInit() {
    let groupedItems = {};
    this.response = await this.productService.getAllProducts();
    this.products = this.response.success ? this.response.products : [];
    const responseInventories: GetInventoriesResponseInterface = await this.inventoryService.getAllInventories();
    if (responseInventories.success) {
      this.inventories = responseInventories.inventoryItems;
      groupedItems = this.inventories.reduce((acc, item) => {
        if (!acc[item.categoria.toLocaleLowerCase()]) {
          acc[item.categoria.toLocaleLowerCase()] = { nombre: item.categoria.toLocaleLowerCase(), stock: 0 };
        }
        acc[item.categoria.toLocaleLowerCase()].stock += item.stock;
        return acc;
      }, {});
    } else {
      this.inventories = [];
    }
        
    this.products.map(product => {
      const category = groupedItems[product.categoriaBase] || 0;
      product.stock = category.stock;
    });
  }
  getStatus(product: Product) {
    if (product.stock > 5) {
      return 'success'
    } else if (product.stock <= 5 && product.stock > 0) {
      return 'warning'
    }

    return 'danger'
  }

  getStock(product: Product) {
    if (product.stock > 5) {
      return 'Disponible'
    } else if (product.stock <= 5 && product.stock > 0) {
      return 'Pocas pzas'
    }

    return 'No Disponible'
  }

  deleteDialog(product: Product, event: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `¿Desea eliminar el producto ${product.nombre}?`,
      header: 'Eliminar Producto',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",
      acceptLabel: "Eliminar",
      rejectLabel: "Cancelar",

      accept: async () => {
        const response: any = await this.productService.deleteProduct(product._id);
        if (response.success) {
          this.products = this.products.filter(p => p !== product);
          this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Producto Eliminado' });
        }
      },
    });
  }

  async updateProduct(productForm: NgForm) {
    try {
      if (productForm.valid) {
        this.uploading = true;
        if (this.uploadedFile) {
          const response: FileUploadResponseInterface = await this.fileUploadService.uploadFile(this.uploadedFile);
          if (response.success) {
            this.product.imagen = response.url;
          }
        }

        const response: AddProductResponseInterface | string = await this.productService.updateProduct(this.product.id, this.product);
        if (typeof (response) === 'string') {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response });
          this.uploading = false;
        } else {
          if (response.success) {
            this.response = await this.productService.getAllProducts();
            this.products = this.response.success ? this.response.products : [];
            this.messageService.add({ severity: 'success', summary: 'Info', detail: 'Producto Actualizado' });
            this.uploading = false;
            this.isEditVisible = false;
          }
        }
      }
    } catch (error) {
      this.uploading = false;
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
      this.isEditVisible = false;
    }
  }

  onFileSelect(event: any) {
    this.uploadedFile = event.files[0];
  }

  showDialog(product: Product) {
    this.product = {
      id: product._id,
      categoria: product.categoria,
      codigo: product.codigo,
      descripcion: product.descripcion,
      nombre: product.nombre,
      precio: product.precio,
      categoriaBase: product.categoriaBase
    }
    this.isEditVisible = true;
  }

  async closeDialog(productForm: NgForm) {
    this.product = {
      nombre: '',
      precio: null,
      categoriaBase: '',
      categoria: '',
      codigo: '',
      descripcion: '',
      imagen: ''
    };

    this.uploadedFile = null;
    this.fileUpload.clear();

    productForm.resetForm();

    this.isEditVisible = false;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

}
