import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService, Message } from 'primeng/api';
import { Table } from 'primeng/table';
import { AddInventoryRequestInterface } from 'src/app/demo/interfaces/requests/addInventoryRequestInterface';
import { AddInventoryResponseInterface } from 'src/app/demo/interfaces/responses/addInventoryResponseInterface';
import { GetInventoriesResponseInterface, InventoryItem } from 'src/app/demo/interfaces/responses/getInventoriesResponseInterface';
import { InventoryService } from 'src/app/demo/service/inventory.service';

@Component({
  templateUrl: './inventory.component.html',
  providers: [ConfirmationService]
})
export class InventoryComponent implements OnInit {

  @ViewChild('filter') filter!: ElementRef;

  inventory: AddInventoryRequestInterface = {
    color: '',
    nombre: '',
    stock: null,
    talla: '',
    categoria: ''
  }

  loading: boolean = false;

  isNewInventoryVisible: boolean = false;

  tallas: string[] = ["ECH", "CH", "M", "G", "EG", "EEG"];

  inventories: InventoryItem[];

  errorMessages: Message[] = [];

  isUpdate: boolean = false;

  inventoryId: string;

  stockCategories: any[] = [
    { label: 'Contenedores', value: 'contenedores' },
    { label: 'Playeras', value: 'playeras' },
    { label: 'Sudaderas', value: 'sudaderas' },
    { label: 'Souvenirs', value: 'souvenirs' }
  ]

  constructor(private inventoryService: InventoryService, private confirmationService: ConfirmationService) { }

  async updateInventory() {
    if (!this.validateInventory()) {
      const response: AddInventoryResponseInterface = await this.inventoryService.updateInventory(this.inventoryId, this.inventory);
      if (response.success) {
        this.inventories.push(response.inventoryItem);
        this.isNewInventoryVisible = false;
        this.getInventories();
        this.inventoryId = null;
        this.resetForm();
      } else {
        this.showErrorMessages(response.message);
      }
    }
  }

  async createInventory() {
    if (!this.validateInventory()) {
      const response: AddInventoryResponseInterface = await this.inventoryService.addInventory(this.inventory);
      if (response.success) {
        this.inventories.push(response.inventoryItem);
        this.isNewInventoryVisible = false;
        this.getInventories();
        this.resetForm();
      } else {
        this.showErrorMessages(response.message);
      }
    }
  }

  validateInventory() {
    if (!this.inventory.nombre || this.inventory.nombre === '') {
      this.showErrorMessages('El nombre es requerido');
    }

    if (!this.inventory.color || this.inventory.color === '') {
      this.showErrorMessages('El color es requerido');
    }

    if (!this.inventory.stock || this.inventory.stock === 0) {
      this.showErrorMessages('El stock debe ser mayor a cero');
    }

    if (!this.inventory.categoria || this.inventory.categoria === '') {
      this.showErrorMessages('La categoría es requerida');
    }

    return this.errorMessages.length > 0;
  }

  async ngOnInit() {
    this.getInventories();
  }

  async getInventories() {
    const inventoryResponse: GetInventoriesResponseInterface = await this.inventoryService.getAllInventories();
    if (inventoryResponse.success) {
      this.inventories = [];
      this.inventories = inventoryResponse.inventoryItems;
    } else {
      this.inventories = [];
    }
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  async deleteInventory(event: any, id: string) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: '¿Desea Eliminar este Inventario?',
      header: 'Inventarios',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      accept: async () => {
        const response: AddInventoryResponseInterface = await this.inventoryService.deleteInventory(id);
        if (response.success) {
          this.showSuccessMessages(response.message);
          this.getInventories();
          this.isNewInventoryVisible = false;
        }
      },
      reject: () => {
      }
    });
  }

  showSuccessMessages(message: string) {
    this.errorMessages = [];
    this.errorMessages.push({ severity: 'success', summary: message, life: 3000 });
  }

  showErrorMessages(message: string) {
    this.errorMessages = [];
    this.errorMessages.push({ severity: 'error', summary: message });
  }

  showNewInventoryDialog(inventory?: InventoryItem) {
    this.errorMessages = []
    if (inventory) {
      this.inventory = {
        color: inventory.color,
        nombre: inventory.nombre,
        stock: inventory.stock,
        talla: inventory.talla,
        categoria: inventory.categoria
      }
      this.isUpdate = true;
      this.inventoryId = inventory._id;
    }
    this.isNewInventoryVisible = true;
  }

  hideNewInventoryDialog() {
    this.resetForm();
  }

  resetForm() {
    this.errorMessages = [];
    this.isNewInventoryVisible = false;
    this.inventory = {
      color: '',
      nombre: '',
      stock: null,
      talla: '',
      categoria: ''
    }
  }
}
