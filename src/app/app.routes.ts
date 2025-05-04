import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'products',
    loadComponent: () => import('../app/products/product-list/product-list.component').then(c => c.ProductListComponent)
  },
  {
    path: 'cart',
    loadComponent: () => import('../app/cart/cart-list/cart-list.component').then(c => c.CartListComponent)
  },
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  }
];
