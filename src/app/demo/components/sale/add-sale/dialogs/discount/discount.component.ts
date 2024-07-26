import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-discount',
  standalone: true,
  imports: [DialogModule, InputNumberModule, ButtonModule, FormsModule],
  templateUrl: './discount.component.html',
  styles: ``
})
export class DiscountComponent {
  
}
