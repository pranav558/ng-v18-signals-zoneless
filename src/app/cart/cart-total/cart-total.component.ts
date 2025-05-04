import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CartService } from '../cart.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-cart-total',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './cart-total.component.html',
  styleUrl: './cart-total.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartTotalComponent {
  cartService = inject(CartService);
}
