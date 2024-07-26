import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditSaleRouterModule } from './edit-sale-routing.module';
import { EditSaleComponent } from './edit-sale.component';
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
import { InputMaskModule } from 'primeng/inputmask';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CheckboxModule } from 'primeng/checkbox';
import { ImageModule } from 'primeng/image';



@NgModule({
  imports: [
    CommonModule,
    EditSaleRouterModule,
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
    InputMaskModule,
    ConfirmDialogModule,
    CheckboxModule,
    ImageModule
  ],
  declarations: [EditSaleComponent],
})
export class EditSaleModule { }
