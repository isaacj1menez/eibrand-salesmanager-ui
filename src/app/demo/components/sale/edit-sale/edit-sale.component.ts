import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ConfirmationService, Message, SelectItem } from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import { FileUpload } from 'primeng/fileupload';
import { NewProductInterface } from 'src/app/demo/interfaces/newProductInterface';
import { AddSaleRequestInterface, SaleProduct } from 'src/app/demo/interfaces/requests/addSaleRequestInterface';
import { AddSaleResponseInterface } from 'src/app/demo/interfaces/responses/addSaleResponseInterface';
import { FileDeleteResponseInterface } from 'src/app/demo/interfaces/responses/fileDeleteResponseInterface';
import { FileUploadResponseInterface } from 'src/app/demo/interfaces/responses/fileUploadResponseInterface';
import { Collaborator, GetCollaboratorsResponseInterface } from 'src/app/demo/interfaces/responses/getCollaboratorsResponseInterface';
import { GetInventoriesResponseInterface, InventoryItem } from 'src/app/demo/interfaces/responses/getInventoriesResponseInterface';
import { GetProductsResponseInterface, Product } from 'src/app/demo/interfaces/responses/getProductsResponseInterface';
import { CollaboratorService } from 'src/app/demo/service/collaborator.service';
import { FileUploadService } from 'src/app/demo/service/file-upload.service';
import { InventoryService } from 'src/app/demo/service/inventory.service';
import { ProductService } from 'src/app/demo/service/product.service';
import { SalesService } from 'src/app/demo/service/sale.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GetSaleResponseInterface, Sale } from 'src/app/demo/interfaces/responses/getSaleResponseInterface';
import { MultiSelect } from 'primeng/multiselect';
import { WhatsappService } from 'src/app/demo/service/whatsapp.service';

@Component({
  templateUrl: './edit-sale.component.html',
  providers: [ConfirmationService]
})
export class EditSaleComponent implements OnInit {
  @ViewChildren('productImageList') productImageList: QueryList<FileUpload>;
  @ViewChild('cmbTalla') cmbTalla: Dropdown;
  @ViewChild('multiSelect') multiSelect: MultiSelect;

  @ViewChild('productImage') fileUpload: FileUpload;
  uploadedFile: File | null = null;

  sale: AddSaleRequestInterface = {
    fecha: new Date(),
    fechaEntrega: new Date(),
    total: 0,
    restante: 0,
    anticipo: 0,
    metodoPago: '',
    status: 'PENDIENTE',
    descuento: 0,
    envio: 0,
    cargoDisenos: 0,
    impuestos: 0,
    statusPago: 'PENDIENTE',
    cliente: {
      nombre: '',
      telefono: '',
      canalComunicacion: '',
      direccion: {
        direccion: '',
        codigoPostal: '',
        estado: ''
      }
    },
    productos: [],
    imagenComprobante: '',
    observaciones: '',
    guiaEnvio: '',
    puntoEntrega: '',
    urgente: false,
    vendedor: '',
    resultado: ''
  }

  // Productos registrados
  products: Product[] = [];

  // Colaboradores Registrados
  collaborators: Collaborator[] = [];

  // Inventarios Registrados
  inventories: InventoryItem[] = [];

  // Interfaz de product response
  productResponse: GetProductsResponseInterface;

  // Interfaz de collabortor response
  collaboratorResponse: GetCollaboratorsResponseInterface;

  // Interfaz de inventarios response
  inventoriesResponse: GetInventoriesResponseInterface;

  // Productos seleccionados para la venta
  selectedProducts: SaleProduct[] = [];

  // Métodos de pago
  paymentMethods: string[] = ["Transferencia", "Efectivo", "Depósito"];

  // Canales de comunicación
  channels: string[] = ["Instagram", "Facebook", "Google", "WhatsApp", "Personal"];

  // Mostrar cargos adicionales
  visibleAdditionalCharges: boolean = false;

  // Estados de la república
  states: SelectItem[] = [];

  // Verficar si se esta agregando una nueva venta
  uploading: boolean = false;

  // Mensajes de error.
  messages: Message[] = [];

  // Productos seleccionados del combo
  markedProducts: SaleProduct[] = [];

  // Productos desmarcados
  previousMarkedProducts: Product[] = [];

  // Cantidad default por producto
  cantidad: number = 1;

  // Cantidad del subtotal por producto
  subtotal: number = 0;

  // Descuento aplicado
  descuento: number = 0;

  // Saber si el descuento es en % o en MXN
  tipoDescuento: string = '%';

  // Costo de envio
  envio: number = 0;

  // Impuestos
  impuestos: number = 0;

  // En caso de agregar un producto que no exista
  newProduct: NewProductInterface = {
    nombre: '',
    precio: 0
  }

  // Para ocultar o mostrar el form de new Product
  isNewProductVisible: boolean = false;

  // Para ocultar o mostrar el form de color y talla
  isSizeVisiable: boolean = false;

  // Para ocultar o mostrar el form de cargos adicionales
  isAdditionalChargesVisible: boolean = false;

  // Para ocultar o mostrar el form de cargos adicionales
  isPreviewVisible: boolean = false;

  // Para deshabilitar el resete de diseno 5 segundos.
  isResetEnable: boolean = false;

  // Para controlar que inventario se selecciona 
  inventory: string;

  //File del comprobante
  comprobante: File | null = null;

  // id of the sale
  saleId: string;

  // Para saber si la centa existe o no
  noSaleFound: boolean = false;

  // Para cambiar los status
  statuses: any[] = [];

  // Para cambiar los status
  preview: string = '';

  constructor(private productService: ProductService,
    private saleService: SalesService,
    private collaboratorService: CollaboratorService,
    private fileUploadService: FileUploadService,
    private inventoryService: InventoryService,
    private confirmationService: ConfirmationService,
    private whatsappService: WhatsappService,
    private route: ActivatedRoute,
    private router: Router) { }

  async ngOnInit() {
    this.productResponse = await this.productService.getAllProducts();
    this.products = this.productResponse.success ? this.productResponse.products : [];
    this.collaboratorResponse = await this.collaboratorService.getAllCollaborators();
    this.collaborators = this.collaboratorResponse.success ? this.collaboratorResponse.collaborators : [];

    await this.setData();

    this.statuses = [
      { label: 'Pendiente', value: 'pendiente', class: 'proposal' },
      { label: 'En Proceso', value: 'en_proceso', class: 'renewal' },
      { label: 'Completada', value: 'completada', class: 'qualified' },
      { label: 'Cancelada', value: 'cancelada', class: 'unqualified' },
      { label: 'Enviada', value: 'enviada', class: 'new' },
    ];

    this.states = [
      { label: 'Aguascalientes', value: 'Aguascalientes' },
      { label: 'Baja California', value: 'Baja California' },
      { label: 'Baja California Sur', value: 'Baja California Sur' },
      { label: 'Campeche', value: 'Campeche' },
      { label: 'Chiapas', value: 'Chiapas' },
      { label: 'Chihuahua', value: 'Chihuahua' },
      { label: 'Ciudad de México', value: 'Ciudad de México' },
      { label: 'Coahuila', value: 'Coahuila' },
      { label: 'Colima', value: 'Colima' },
      { label: 'Durango', value: 'Durango' },
      { label: 'Estado de México', value: 'Estado de México' },
      { label: 'Guanajuato', value: 'Guanajuato' },
      { label: 'Guerrero', value: 'Guerrero' },
      { label: 'Hidalgo', value: 'Hidalgo' },
      { label: 'Jalisco', value: 'Jalisco' },
      { label: 'Michoacán', value: 'Michoacán' },
      { label: 'Morelos', value: 'Morelos' },
      { label: 'Nayarit', value: 'Nayarit' },
      { label: 'Nuevo León', value: 'Nuevo León' },
      { label: 'Oaxaca', value: 'Oaxaca' },
      { label: 'Puebla', value: 'Puebla' },
      { label: 'Querétaro', value: 'Querétaro' },
      { label: 'Quintana Roo', value: 'Quintana Roo' },
      { label: 'San Luis Potosí', value: 'San Luis Potosí' },
      { label: 'Sinaloa', value: 'Sinaloa' },
      { label: 'Sonora', value: 'Sonora' },
      { label: 'Tabasco', value: 'Tabasco' },
      { label: 'Tamaulipas', value: 'Tamaulipas' },
      { label: 'Tlaxcala', value: 'Tlaxcala' },
      { label: 'Veracruz', value: 'Veracruz' },
      { label: 'Yucatán', value: 'Yucatán' },
      { label: 'Zacatecas', value: 'Zacatecas' }
    ];
  }

  getStatusClass(status: string): string {
    const statusMap: { [key: string]: string } = {
      'PENDIENTE': 'proposal',
      'EN_PROCESO': 'renewal',
      'COMPLETADA': 'qualified',
      'CANCELADA': 'unqualified',
      'ENVIADA': 'new'
    };

    return statusMap[status] || status;
  }

  async setData() {
    this.saleId = this.route.snapshot.paramMap.get('id');
    const saleResponse: GetSaleResponseInterface = await this.saleService.getSaleById(this.saleId);
    saleResponse.sale.cliente.canalComunicacion = saleResponse.sale.cliente.canalComunicacion.toLocaleLowerCase().charAt(0).toLocaleUpperCase() + saleResponse.sale.cliente.canalComunicacion.toLocaleLowerCase().slice(1);
    saleResponse.sale.metodoPago = saleResponse.sale.metodoPago.toLocaleLowerCase().charAt(0).toLocaleUpperCase() + saleResponse.sale.metodoPago.toLocaleLowerCase().slice(1);
    saleResponse.sale.status = saleResponse.sale.status.toLocaleLowerCase();
    saleResponse.sale.statusPago = saleResponse.sale.statusPago.toLocaleLowerCase().charAt(0).toLocaleUpperCase() + saleResponse.sale.statusPago.toLocaleLowerCase().slice(1);
    if (saleResponse.success) {
      const sale: Sale = saleResponse.sale;
      sale.productos.forEach(p => {
        this.selectedProducts.push({
          cantidad: p.cantidad,
          id: p.id,
          nombre: p.nombre,
          precio: p.precio,
          subtotal: p.subtotal,
          diseno: p.diseno,
          inventario: p.inventario,
          categoria: p.categoria
        });
      });

      this.sale = {
        fecha: sale.fecha,
        cliente: sale.cliente,
        fechaEntrega: new Date(sale.fechaEntrega),
        metodoPago: sale.metodoPago,
        productos: this.selectedProducts,
        restante: sale.restante,
        status: sale.status,
        statusPago: sale.statusPago,
        total: sale.total,
        vendedor: sale.vendedor,
        anticipo: sale.anticipo,
        cargoDisenos: sale.cargoDisenos,
        descuento: sale.descuento,
        envio: sale.envio,
        guiaEnvio: sale.guiaEnvio,
        imagenComprobante: sale.imagenComprobante,
        impuestos: sale.impuestos,
        observaciones: sale.observaciones,
        puntoEntrega: sale.puntoEntrega,
        urgente: sale.urgente,
        resultado: sale.resultado
      }

    } else {
      this.noSaleFound = true;
    }
  }

  onFileSelect(event: any) {
    this.uploadedFile = event.files[0];
  }

  async getInventories() {
    this.inventoriesResponse = await this.inventoryService.getAllInventories();
    this.inventories = this.inventoriesResponse.success ? this.inventoriesResponse.inventoryItems : [];

    this.inventories = this.inventories
      .filter(item => item.stock > 0)
      .map(item => ({
        ...item,
        label: `${item.nombre} - ${item.color} - ${item.talla}`,
        value: item._id
      }));
  }

  async updateSale(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: '¿Guardar Venta?',
      header: 'Ventas',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      accept: async () => {
        if (!this.validateSale()) {

          if (this.uploadedFile) {
            const response: FileUploadResponseInterface = await this.fileUploadService.uploadFile(this.uploadedFile);
            if (response.success) {
              this.sale.resultado = response.url;
            }
          }

          const response: any = await this.saleService.updateSale(this.saleId, this.sale);
          const addSaleResponse: AddSaleResponseInterface = response;
          if (addSaleResponse.success) {
            this.resetComponents();
            this.messages = [];
            this.router.navigate(['/management/ventas/ordenes']);
          } else {
            this.messages = [];
            if (Array.isArray(addSaleResponse.errors)) {
              this.messages.push({ severity: 'success', summary: addSaleResponse.errors[0] });
            } else {
              this.messages.push({ severity: 'success', summary: addSaleResponse.errors });
            }
          }
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      reject: () => {
      }
    });
  }

  cancelEdit() {
    this.router.navigate(['/management/ventas/ordenes']);
  }

  validateSale(): boolean {
    this.messages = [];

    this.sale.productos = this.selectedProducts;

    if (this.sale.restante && this.sale.restante === 0) {
      this.sale.restante = this.sale.total;
    }

    if (!this.sale.metodoPago) this.messages.push({ severity: 'error', detail: 'El método de pago es requerido' });
    if (!this.sale.cliente.nombre) this.messages.push({ severity: 'error', detail: 'El nombre del cliente es requerido' });
    if (!this.sale.cliente.telefono) this.messages.push({ severity: 'error', detail: 'El teléfono del cliente es requerido' });
    if (!this.sale.cliente.canalComunicacion) {
      this.messages.push({ severity: 'error', detail: 'El canal de comunicación del cliente es requerido' });
    }
    if (this.sale.productos.length === 0) {
      this.messages.push({ severity: 'error', detail: 'Debe haber al menos un producto' });
    }
    if (!this.sale.vendedor) {
      this.messages.push({ severity: 'error', detail: 'Seleccione un colaborador' });
    }

    this.sale.cliente.canalComunicacion = this.sale.cliente.canalComunicacion.toUpperCase();
    this.sale.metodoPago = this.sale.metodoPago.toUpperCase();

    if (this.sale.anticipo > 0) {
      this.sale.statusPago = 'ANTICIPO'
    } else {
      this.sale.restante = this.sale.total;
    }

    if (this.sale.anticipo === this.sale.total) {
      this.sale.statusPago = 'PAGADO';
    }

    this.sale.status = this.sale.status.toUpperCase();
    this.sale.statusPago = this.sale.statusPago.toUpperCase();

    if (this.sale.status === "COMPLETADA") {
      this.whatsappService.sendMessage({
        to: '52' + this.sale.cliente.telefono,
        templateName: 'pedido_terminado',
        client: this.sale.cliente.nombre,
        order: this.saleId
      });
    } else if (this.sale.status === "ENVIADA") {

      if (!this.sale.guiaEnvio) {
        this.messages.push({ severity: 'error', detail: 'Proporcione un número de guía' });
      }

      this.whatsappService.sendMessageGuide({
        to: '52' + this.sale.cliente.telefono,
        templateName: 'pedido_enviado',
        client: this.sale.cliente.nombre,
        guide: this.sale.guiaEnvio
      });
    }

    return this.messages.length > 0;

  }


  addProduct(event: any) {
    // Convert the event value to a set for easier comparison
    const currentSelection = new Set(event.value.map((p: Product) => p._id));

    // Detect removed products by comparing previous and current selection
    this.previousMarkedProducts.forEach((prevProduct: Product) => {
      if (!currentSelection.has(prevProduct._id)) {
        const index = this.selectedProducts.findIndex(p => p.id === prevProduct._id);
        if (index !== -1) {
          const removedProducts = this.selectedProducts.splice(index, 1);
          this.updateTotal(removedProducts[0]);
        }
      }
    });

    // Add new selected products
    event.value.forEach((product: Product) => {
      if (product.categoria === "Textiles" && !this.selectedProducts.some(sp => sp.id === product._id)) {
        this.isSizeVisiable = true;
      }
      if (!this.selectedProducts.some(sp => sp.id === product._id)) {
        const selectedProduct: SaleProduct = {
          nombre: product.nombre,
          id: product._id,
          cantidad: this.cantidad,
          precio: product.precio,
          subtotal: this.cantidad * product.precio,
          diseno: null,
          inventario: this.inventory
        };
        this.selectedProducts.push(selectedProduct);
        this.updateTotal(selectedProduct);
      }
    });

    this.previousMarkedProducts = [...event.value];
  }

  addNewProduct() {
    const selectedProduct: SaleProduct = {
      nombre: this.newProduct.nombre,
      id: '',
      cantidad: 1,
      precio: this.newProduct.precio,
      subtotal: 1 * this.newProduct.precio,
      diseno: null
    }

    this.selectedProducts.push(selectedProduct);
    this.updateTotal(selectedProduct);

    this.closeNewProductDialog();
  }

  addAdditionalCharges() {
    this.sale.total = this.subtotal;

    if (this.sale.descuento && this.sale.descuento > 0) {
      if (this.tipoDescuento === 'MXN') {
        this.sale.total = this.sale.total - this.sale.descuento;
        this.sale.descuento = (this.sale.descuento / this.sale.total) * 100;
        this.sale.descuento = Number(this.sale.descuento.toFixed(1).toString());
      } else {
        this.sale.total = this.sale.total - ((this.sale.total * this.sale.descuento) / 100);
      }
    }

    if (this.sale.cargoDisenos && this.sale.cargoDisenos > 0) {
      this.sale.total += this.sale.cargoDisenos;
    } else {
      this.sale.cargoDisenos = 0;
    }

    if (this.sale.envio && this.sale.envio > 0) {
      this.sale.total += this.sale.envio;
    } else {
      this.sale.envio = 0;
    }

    if (this.sale.impuestos && this.sale.impuestos > 0) {
      this.sale.total += this.sale.impuestos;
    } else {
      this.sale.impuestos = 0;
    }

    this.isAdditionalChargesVisible = false;
  }

  removeProduct(row: number, product: SaleProduct) {
    const index = this.selectedProducts.findIndex(p => p.nombre === product.nombre);

    if (index !== -1) {
      this.selectedProducts.splice(index, 1);
    }

    this.updateTotal(product);
    this.markedProducts = this.markedProducts.filter(p => p.nombre !== product.nombre);
    if (product.diseno) {
      this.clearFile(row, product);
    }
  }

  async clearFile(index: number, product: SaleProduct) {
    const response: FileDeleteResponseInterface = await this.fileUploadService.deleteFile(product.diseno);
    if (response.success) {
      const fileUpload = this.productImageList.toArray()[index];
      if (fileUpload) {
        fileUpload.clear();
      }
    }
  }

  async addDesign(event: any, product: SaleProduct) {
    const file: File = event.files[0];
    if (file) {
      this.isResetEnable = true;
      const response: FileUploadResponseInterface = await this.fileUploadService.uploadFile(file);
      product.diseno = response.url;
      setTimeout(() => {
        this.isResetEnable = false;
      }, 4000);
    } else {
      product.diseno = '';
    }
  }

  updateTotal(product: SaleProduct) {
    if (product) {
      product.subtotal = product.cantidad * product.precio;
      this.sale.total = 0;
      this.subtotal = 0;
      this.selectedProducts.forEach(product => {
        this.sale.total += product.subtotal;
        this.subtotal += product.subtotal;
      });
    }
  }

  setRemaning() {
    this.sale.restante = this.sale.total - this.sale.anticipo;
  }

  onInventoryChange(event) {
    const product: SaleProduct = this.selectedProducts[this.selectedProducts.length - 1];
    product.inventario = this.inventory;
    product.categoria = event.originalEvent.srcElement.innerText;
  }

  async onComprobanteSelect(event: any) {
    this.comprobante = event.files[0];
    if (this.comprobante) {
      const response: FileUploadResponseInterface = await this.fileUploadService.uploadFile(this.comprobante);
      this.sale.imagenComprobante = response.url;
    } else {
      this.sale.imagenComprobante = '';
    }
  }

  closeNewProductDialog() {
    this.newProduct = {
      nombre: '',
      precio: 0
    }

    this.isNewProductVisible = false;
  }

  closeAdditionalChargesDialog() {
    this.isAdditionalChargesVisible = false;
  }

  closePreviewDialog() {
    this.isPreviewVisible = false;
  }

  closeSizeDialog() {
    const product: SaleProduct = this.selectedProducts.pop();
    this.removeProduct(0, product);
    this.cmbTalla.selectedOption = '';
    this.inventory = '';
    this.isSizeVisiable = false;
  }

  saveShirtSize() {
    this.cmbTalla.selectedOption = '';
    this.inventory = '';
    this.isSizeVisiable = false;
  }

  showNewProductDialog() {
    this.isNewProductVisible = true;
  }

  showPreviewDialog(index: number, product: SaleProduct) {
    this.preview = product.diseno;
    this.isPreviewVisible = true;
  }

  showAdditionalChargesDialog() {
    this.isAdditionalChargesVisible = true;
  }

  resetComponents(): void {
    this.sale = {
      fecha: new Date(),
      fechaEntrega: new Date(),
      total: 0,
      restante: 0,
      anticipo: 0,
      metodoPago: '',
      status: '',
      descuento: 0,
      envio: 0,
      impuestos: 0,
      statusPago: '',
      cliente: {
        nombre: '',
        telefono: '',
        canalComunicacion: '',
        direccion: {
          direccion: '',
          codigoPostal: '',
          estado: ''
        }
      },
      productos: [],
      imagenComprobante: '',
      observaciones: '',
      guiaEnvio: '',
      puntoEntrega: '',
      urgente: false,
      vendedor: ''
    };

    this.inventories = [];
    this.productResponse = null;
    this.collaboratorResponse = null;
    this.inventoriesResponse = null;
    this.selectedProducts = [];
    this.paymentMethods = ["Transferencia", "Efectivo", "Depósito"];
    this.channels = ["Instagram", "Facebook", "Google", "WhatsApp", "Personal"];
    this.visibleAdditionalCharges = false;
    this.uploading = false;
    this.messages = [];
    this.markedProducts = [];
    this.previousMarkedProducts = [];
    this.cantidad = 1;
    this.subtotal = 0;
    this.descuento = 0;
    this.tipoDescuento = '%';
    this.envio = 0;
    this.impuestos = 0;
    this.newProduct = { nombre: '', precio: 0 };
    this.isNewProductVisible = false;
    this.isSizeVisiable = false;
    this.isAdditionalChargesVisible = false;
    this.isResetEnable = false;
    this.inventory = '';
  }

}
