import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { CartTotalComponent } from '../cart-total/cart-total.component';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart-list',
  standalone: true,
  imports: [CartItemComponent, CartTotalComponent],
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartListComponent {
cartService = inject(CartService);
cartItems = this.cartService.cartItems;
}
