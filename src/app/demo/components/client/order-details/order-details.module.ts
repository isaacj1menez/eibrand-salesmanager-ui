import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDetailsComponent } from './order-details.component';
import { OrderDetailsRoutingModule } from './order-details-routing.module';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { ToastModule } from 'primeng/toast';
import { MenubarModule } from 'primeng/menubar';



@NgModule({
  imports: [
    CommonModule,
    OrderDetailsRoutingModule,
    TableModule,
    FormsModule,
    ButtonModule,
    DividerModule,
    CardModule,
    ImageModule,
    ToastModule,
    MenubarModule
  ],
  declarations: [OrderDetailsComponent],
})
export class OrderDetailsModule { }
