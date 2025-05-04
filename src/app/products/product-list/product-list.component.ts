import { Component, inject } from '@angular/core';
import { ProductService } from '../product.service';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ProductDetailComponent } from '../product-detail/product-detail.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, ProductDetailComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  pageTitle = 'Products';
  productService = inject(ProductService);

  products = this.productService.products;
  productId = this.productService.productId;

  onSelect(productId: number): void {
    this.productService.setproductId(productId);
  }
}
