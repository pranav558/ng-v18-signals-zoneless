import { DecimalPipe } from '@angular/common';
import { ProductService } from './../product.service';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CartService } from '../../cart/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent {
  productService = inject(ProductService);
  cartService = inject(CartService);
  productDetail = this.productService.productDetail;
  pageTitle = computed(() => `Details for: ${this.productDetail()?.title}`);

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }
}
