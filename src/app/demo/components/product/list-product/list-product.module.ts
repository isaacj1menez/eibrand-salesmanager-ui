import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProductRoutingModule } from './list-product-routing.module';
import { ListProductComponent } from './list-product.component';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ImageModule } from 'primeng/image';

@NgModule({
  imports: [
    CommonModule,
    ListProductRoutingModule,
    TableModule,
    TagModule,
    ButtonModule,
    ConfirmDialogModule,
    ToastModule,
    DialogModule,
    InputTextModule,
    AvatarModule,
    ButtonModule,
    FileUploadModule,
    InputNumberModule,
    DropdownModule,
    FormsModule,
    InputTextareaModule,
    ImageModule
  ],
  declarations: [ListProductComponent],
})
export class ListProductModule { }
