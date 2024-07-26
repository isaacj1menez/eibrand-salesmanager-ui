import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubCategoryComponent } from './sub-category.component';
import { SubCategoryRoutingModule } from './sub-category-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SubCategoryRoutingModule
  ],
  declarations: [SubCategoryComponent],
})
export class SubCategoryModule { }
