import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddSaleComponent } from './add-sale.component';
import { AddSaleModule } from './add-sale-routing.module';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { DiscountComponent } from './dialogs/discount/discount.component';
import { InputMaskModule } from 'primeng/inputmask';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CheckboxModule } from 'primeng/checkbox';
import { ImageModule } from 'primeng/image';

@NgModule({
  imports: [
    CommonModule,
    AddSaleModule,
    FormsModule,
    CalendarModule,
    MultiSelectModule,
    OverlayPanelModule,
    TableModule,
    DialogModule,
    DropdownModule,
    InputNumberModule,
    InputTextModule,
    MessagesModule,
    InputTextareaModule,
    FileUploadModule,
    DiscountComponent,
    InputMaskModule,
    ConfirmDialogModule,
    CheckboxModule,
    ImageModule
  ],
  declarations: [AddSaleComponent],
})
export class AddSaleRoutingModule { }
