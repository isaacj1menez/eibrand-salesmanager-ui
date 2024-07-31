import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Sale } from 'src/app/demo/interfaces/responses/addSaleResponseInterface';
import { GetSalesResponseInterface, Sale as responseSale } from 'src/app/demo/interfaces/responses/getSalesResponseInterface';
import { SalesService } from 'src/app/demo/service/sale.service';

@Component({
  templateUrl: './orders.component.html',
})
export class OrdersComponent implements OnInit {

  @ViewChild('filter') filter!: ElementRef;

  salesResponse: GetSalesResponseInterface;
  sales: Sale[];
  statuses: any[] = [];
  paymentStatuses: any[] = [];

  loading: boolean = false;

  sale: Sale;

  constructor(private salesService: SalesService, private router: Router) {

  }

  async ngOnInit() {
    this.salesResponse = await this.salesService.getAllSales();
    this.sales = this.salesResponse.sales;

    this.statuses = [
      { label: 'Pendiente', value: 'pendiente', class: 'proposal' },
      { label: 'En Proceso', value: 'en_proceso', class: 'renewal' },
      { label: 'Completada', value: 'completada', class: 'qualified' },
      { label: 'Cancelada', value: 'cancelada', class: 'unqualified' },
      { label: 'Enviada', value: 'enviada', class: 'new' },
    ];

    this.paymentStatuses = [
      { label: 'Pendiente', value: 'pendiente', class: 'proposal' },
      { label: 'Pagado', value: 'pagado', class: 'qualified' },
      { label: 'Anticipo', value: 'anticipo', class: 'renewal' },
    ]

  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
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

  getPaymentStatusClass(status: string): string {
    const statusMap: { [key: string]: string } = {
      'PENDIENTE': 'proposal',
      'ANTICIPO': 'renewal',
      'PAGADO': 'qualified',
    };

    return statusMap[status] || status;
  }

  getProductos(arr: { nombre: string }[]): string {
    return arr.map(item => item.nombre).join(' - ');
  }

  viewSale(sale: responseSale) {
    this.router.navigate(['/management/ventas/editar/', sale._id]);
  }

  printSale(sale: responseSale) {
    this.sale = sale;

    // Reemplaza saltos de línea con <br> para las observaciones
    const observaciones = this.sale.observaciones.replace(/\n/g, '<br>');

    const printContent = `
        <div class="ticket">
            <h2>PEDIDO</h2>
            <hr>
            <div class="info">
                <p><strong>Cliente:</strong> ${this.sale.cliente.nombre}</p>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Cantidad</th>
                        <th>Producto</th>
                        <th>Precio</th>
                    </tr>
                </thead>
                <tbody>
                    ${this.sale.productos.map(producto => `
                        <tr>
                            <td>${producto.cantidad}</td>
                            <td>${producto.nombre}</td>
                            <td>${producto.precio}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            <div class="total">
                <p><strong>Total:</strong> ${this.sale.total}</p>
                <p><strong>Restante:</strong> ${this.sale.restante}</p>
            </div>
            <hr>
            <div class="footer">
                <p><strong>Observaciones Extra:</strong></p>
                <p>${observaciones}</p>
            </div>
        </div>
    `;

    const WindowPrt = window.open('', '', '');
    WindowPrt.document.write('<html><title>Nota</title><head>');
    WindowPrt.document.write('<style>');
    WindowPrt.document.write('body { font-family: Arial, sans-serif; margin: 0; padding: 20px; text-align: left; font-size: 12px; }');
    WindowPrt.document.write('.ticket { max-width: 300px; margin: auto; border: 0.5px solid #000; padding: 10px; }');
    WindowPrt.document.write('.ticket hr { border-top: 0.5px solid #000; }');
    WindowPrt.document.write('.ticket .info { text-align: left; margin-bottom: 10px; }');
    WindowPrt.document.write('.ticket .info p { margin: 0; padding: 2px 0; }');
    WindowPrt.document.write('.ticket table { width: 100%; border-collapse: collapse; margin-bottom: 10px; }');
    WindowPrt.document.write('.ticket table th, .ticket table td { border: 0.5px solid #000; padding: 5px; text-align: left; }');
    WindowPrt.document.write('.ticket .total { text-align: right; margin-bottom: 10px; }');
    WindowPrt.document.write('.ticket .footer { text-align: left; }');
    WindowPrt.document.write('</style>');
    WindowPrt.document.write('</head><body>');
    WindowPrt.document.write(printContent);
    WindowPrt.document.write('</body></html>');
    WindowPrt.document.close();
    WindowPrt.focus();
    WindowPrt.print();
    WindowPrt.close();
  }

}
