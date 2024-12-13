import { CartService } from './../cart.service';
import { NgIf, DecimalPipe, NgFor } from '@angular/common';
import { Component, computed, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartItem } from '../cart';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [NgIf, NgFor, DecimalPipe, FormsModule],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss',
})
export class CartItemComponent {
  item = input<CartItem>({ quantity: 0, detail: { id: 0, title: '', price: 0 } });
  cartService =inject(CartService);
  qtyArr = signal([1, 2, 3, 4, 5, 6, 7, 8]);

  cost = computed(()=> this.item().quantity * Number(this.item().detail.price));

  onQuantitySelected(quantity: string): void {
    this.cartService.updateInCart(this.item().detail, Number(quantity));
  }

  onRemove(): void {
    this.cartService.removeFromCart(this.item().detail);
  }
}
