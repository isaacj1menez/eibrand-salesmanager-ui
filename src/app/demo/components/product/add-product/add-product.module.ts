import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductRoutingModule } from './add-product-routing.module';
import { AddProductComponent } from './add-product.component';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { ProgressBarModule } from 'primeng/progressbar';
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';



@NgModule({
  imports: [
    CommonModule,
    AddProductRoutingModule,
    FormsModule,
    InputTextModule,
    DropdownModule,
    InputNumberModule,
    FileUploadModule,
    InputTextareaModule,
    ToastModule,
    ButtonModule,
    BadgeModule,
    ProgressBarModule,
    MessagesModule,
    ConfirmDialogModule
  ],
  declarations: [ AddProductComponent ],
})
export class AddProductModule { }
