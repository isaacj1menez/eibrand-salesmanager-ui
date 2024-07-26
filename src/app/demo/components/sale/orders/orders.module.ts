import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  imports: [
    CommonModule,
    OrdersRoutingModule,
    TableModule,
    InputTextModule,
    FormsModule,
    ButtonModule,
    DropdownModule
  ],
  declarations: [OrdersComponent],
})
export class OrdersModule { }
