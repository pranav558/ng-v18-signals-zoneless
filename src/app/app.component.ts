import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CartService } from './cart/cart.service';
import { LoaderComponent } from './utils/loader/loader.component';
import { LoaderService } from './utils/loader/loader.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgIf, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  pageTitle = 'v18-signals-zoneless';
  cartService = inject(CartService);
  loaderService = inject(LoaderService);
  cartCount = computed(() =>this.cartService.cartItems().reduce((acc, item) => acc + item.quantity, 0));
}
