import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SubCategoryComponent } from './sub-category.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: SubCategoryComponent }
    ])
  ],
  exports: [RouterModule]
})
export class SubCategoryRoutingModule { }
