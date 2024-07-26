import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryRouteingModule } from './inventory-routing.module';
import { InventoryComponent } from './inventory.component';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessagesModule } from 'primeng/messages';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';



@NgModule({
  imports: [
    CommonModule,
    InventoryRouteingModule,
    FormsModule,
    DropdownModule,
    InputNumberModule,
    MessagesModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    DialogModule,
    TableModule,
    ConfirmDialogModule
  ],
  declarations: [InventoryComponent],
})
export class InventoryModule { }
