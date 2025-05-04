import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CartService } from './cart/cart.service';
import { LoaderComponent } from './utils/loader/loader.component';
import { LoaderService } from './utils/loader/loader.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  pageTitle = 'v18-signals-zoneless';
  cartService = inject(CartService);
  loaderService = inject(LoaderService);
}
