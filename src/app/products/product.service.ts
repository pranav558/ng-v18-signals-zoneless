import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { catchError, of, switchMap, tap } from 'rxjs';
import { Item } from '../cart/cart';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  http = inject(HttpClient);
  booksUrl = 'https://fakestoreapi.com/products';

  productId = signal<number | null>(null);

  products = toSignal(
    this.http.get<Item[]>(this.booksUrl).pipe(
      tap(console.log),
      catchError((err) => of([]))
    ),
    { initialValue: [] }
  );

  productDetail = toSignal(toObservable(this.productId).pipe(
    switchMap((productId) =>
      this.http.get<Item>(`${this.booksUrl}/${productId}`).pipe(
        tap(console.log),
        catchError((err) => of({}))
      )
    )
  ), { initialValue: undefined });

  setproductId(productId: number): void {
    this.productId.set(productId);
  }
}
