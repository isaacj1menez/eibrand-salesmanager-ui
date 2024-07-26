import { Component, OnInit, ViewChild } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { ProductRequest } from 'src/app/demo/interfaces/requests/productRequestInterface';
import { Message } from 'primeng/api';
import { FileUploadService } from 'src/app/demo/service/file-upload.service';
import { FileUploadResponseInterface } from 'src/app/demo/interfaces/responses/fileUploadResponseInterface';
import { ProductService } from 'src/app/demo/service/product.service';
import { AddProductResponseInterface } from 'src/app/demo/interfaces/responses/addProductResponseInterface';
import { NgForm } from '@angular/forms';
import { InventoryService } from 'src/app/demo/service/inventory.service';
import { GetInventoriesResponseInterface, InventoryItem } from 'src/app/demo/interfaces/responses/getInventoriesResponseInterface';

interface StockCategory {
  label: string;
  value: string;
}


@Component({
  templateUrl: './add-product.component.html',
})
export class AddProductComponent implements OnInit {
  @ViewChild('productImage') fileUpload: FileUpload;
  uploadedFile: File | null = null;

  categorias: string[] = ["Souvenirs", "Contenedores", "Textiles"];

  uploading: boolean = false;

  errorMessages: Message[] = [];

  product: ProductRequest = {
    nombre: '',
    precio: null,
    categoriaBase: null,
    categoria: '',
    codigo: '',
    descripcion: '',
    imagen: ''
  };

  inventoriesResponse: GetInventoriesResponseInterface;
  inventories: InventoryItem[] = [];

  stockCategories: any[];

  constructor(private fileUploadService: FileUploadService, private productService: ProductService, private inventoryService: InventoryService) { }

  onFileSelect(event: any) {
    this.uploadedFile = event.files[0];
  }

  async getInventories() {
    this.inventoriesResponse = await this.inventoryService.getAllInventories();
    this.inventories = this.inventoriesResponse.success ? this.inventoriesResponse.inventoryItems : [];
    const categoriesSet = new Set<string>();

    this.inventories.forEach(item => {
      categoriesSet.add(item.categoria.replace(/\s+/g, ''));
    });

    const uniqueCategories: StockCategory[] = Array.from(categoriesSet).map(categoria => ({
      label: categoria,
      value: categoria.toLowerCase().replace(/\s+/g, '')
    }));

    return uniqueCategories;

  }

  async ngOnInit() {
    this.stockCategories = await this.getInventories();
  }

  async createProduct(productForm: NgForm) {
    try {
      if (productForm.valid) {
        this.uploading = true;
        if (this.uploadedFile) {
          const response: FileUploadResponseInterface = await this.fileUploadService.uploadFile(this.uploadedFile);
          if (response.success) {
            this.product.imagen = response.url;
          }
        }

        const response: AddProductResponseInterface | string = await this.productService.addProduct(this.product);
        if (typeof (response) === 'string') {
          this.showErrorMessages(response);
          this.uploading = false;
        } else {
          if (response.success) {
            this.showSuccessMessages(response.message);
            this.uploading = false;
            this.resetForm(productForm);
          }
        }
      }
    } catch (error) {
      this.uploading = false;
      this.showErrorMessages(error.message);
    }
  }

  showErrorMessages(error: string) {
    this.errorMessages = [];
    this.uploadedFile = null;
    this.fileUpload.clear();
    this.errorMessages.push({ severity: 'error', summary: error });
  }

  showSuccessMessages(message: string) {
    this.errorMessages = [];
    this.errorMessages.push({ severity: 'success', summary: message, life: 3000 });
  }

  resetForm(productForm: NgForm) {
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
  }
}
