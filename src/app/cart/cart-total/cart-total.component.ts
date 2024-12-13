import { Component, inject } from '@angular/core';
import { CartService } from '../cart.service';
import { DecimalPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-cart-total',
  standalone: true,
  imports: [NgIf, DecimalPipe],
  templateUrl: './cart-total.component.html',
  styleUrl: './cart-total.component.scss'
})
export class CartTotalComponent {
  cartService = inject(CartService);
}
