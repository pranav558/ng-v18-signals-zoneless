import { computed, Injectable, signal } from '@angular/core';
import { CartItem, Item } from './cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems = signal<CartItem[]>([]);

  cartCount = computed(() =>this.cartItems().reduce((acc, item) => acc + item.quantity, 0));

  subTotal = computed(() =>
    this.cartItems().reduce(
      (acc, item) => acc + item.detail.price * item.quantity,
      0
    )
  );

  deliveryFee = computed(() => (this.subTotal() < 200 ? 100 : 0));

  tax = computed(() => Math.round(this.subTotal() * 10.75) / 100);

  totalPrice = computed(() => this.subTotal() + this.deliveryFee() + this.tax());

  addToCart(cartItem: Item): void {
    const item = this.cartItems().find(item => item.detail.id === cartItem.id);
    if (item) {
      this.updateInCart(cartItem, item.quantity + 1);
    } else {
      this.cartItems.update((items) => [...items, { detail: cartItem, quantity: 1 }]);
    }
  }

  updateInCart(cartItem: Item, qty: number): void {
    this.cartItems.update((items) => items.map((item) => item.detail.id === cartItem.id ? { detail: cartItem, quantity: qty } : item));
  }

  removeFromCart(cartItem: Item): void {
    this.cartItems.update((items) => items.filter((item) => item.detail.id !== cartItem.id));
  }
}
