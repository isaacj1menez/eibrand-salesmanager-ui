import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { GetSaleResponseInterface } from 'src/app/demo/interfaces/responses/getSaleResponseInterface';
import { Sale } from 'src/app/demo/interfaces/responses/getSalesResponseInterface';
import { SalesService } from 'src/app/demo/service/sale.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  providers: [ MessageService ]
})
export class OrderDetailsComponent implements OnInit {

  saleId: string;
  saleExist: boolean = false;
  sale: Sale;

  statuses: any[] = [];
  paymentStatuses: any[] = [];

  constructor(private saleService: SalesService,
    private activatedRoute: ActivatedRoute,
    public layoutService: LayoutService,
    public router: Router) {
  }

  getStatusMessage(status: string) {
    switch (status) {
      case 'PENDIENTE':
        return 'Espera de Preparación';
      case 'EN_PROCESO':
        return 'Preparación';
      case 'COMPLETADA':
        return 'Espera de Recolección';
      case 'ENVIADA':
        return 'Reparto';
      default:
        return 'Espera de Preparación'
    }
  }

  async ngOnInit() {
    this.saleId = this.activatedRoute.snapshot.paramMap.get('id');
    this.saleExist = this.saleId ? true : false;
    if (this.saleExist) {
      const saleResponse: GetSaleResponseInterface = await this.saleService.getSaleById(this.saleId);
      if (saleResponse.success) {
        this.sale = saleResponse.sale;
      } else {
        this.sale = null;
      }
    }

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

}
