import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, RouterLink, RouterLinkActive } from '@angular/router';
import { By } from '@angular/platform-browser';
import { signal } from '@angular/core';
import { AppComponent } from './app.component';
import { LoaderComponent } from './utils/loader/loader.component';
import { LoaderService } from './utils/loader/loader.service';
import { CartService } from './cart/cart.service';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let loaderService: LoaderService;
  let cartService: CartService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        LoaderComponent,
        RouterLink,
        RouterLinkActive
      ],
      providers: [
        provideRouter([
          { path: 'products', component: {} as any },
          { path: 'cart', component: {} as any }
        ]),
        provideExperimentalZonelessChangeDetection(),
        {
          provide: LoaderService,
          useValue: {
            isLoading: signal(false),
          },
        },
        {
          provide: CartService,
          // useValue: {
          //   cartCount: signal(0),
          // },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    loaderService = TestBed.inject(LoaderService);
    cartService = TestBed.inject(CartService);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct page title', () => {
    const titleElement = fixture.debugElement.query(By.css('.navbar-brand'));
    expect(titleElement.nativeElement.textContent).toContain('v18-signals-zoneless');
  });

  describe('Loader', () => {
    it('should show loader when isLoading is true', () => {
      loaderService.isLoading.set(true);
      fixture.detectChanges();

      const loader = fixture.debugElement.query(By.css('app-loader'));
      expect(loader).toBeTruthy();
    });

    it('should not show loader when isLoading is false', () => {
      loaderService.isLoading.set(false);
      fixture.detectChanges();

      const loader = fixture.debugElement.query(By.css('app-loader'));
      expect(loader).toBeNull();
    });
  });

  describe('Navigation', () => {
    it('should have Products navigation link', () => {
      fixture.detectChanges();

      const navLinks = fixture.debugElement.queryAll(By.directive(RouterLink));
      expect(navLinks.length).toBeGreaterThan(0);

      const productsLink = navLinks.find(link =>
        link.nativeElement.textContent.includes('Products')
      );

      expect(productsLink).toBeTruthy();
      expect(productsLink?.properties['href']).toContain('/products');
    });

    it('should have Cart navigation link with badge', () => {
      fixture.detectChanges();

      const navLinks = fixture.debugElement.queryAll(By.directive(RouterLink));
      const cartLink = navLinks.find(link =>
        link.nativeElement.textContent.includes('Cart')
      );

      expect(cartLink).toBeTruthy();
      expect(cartLink?.properties['href']).toContain('/cart');

      const badge = cartLink?.query(By.css('.badge'));
      expect(badge).toBeTruthy();
    });

    it('should display correct cart count', () => {
      cartService.cartItems.set([
        { detail: { id: 1, title: 'Product 1', price: 10 }, quantity: 1 },
        { detail: { id: 2, title: 'Product 2', price: 20 }, quantity: 1 }
      ]);
      fixture.detectChanges();

      const badge = fixture.debugElement.query(By.css('.badge'));
      expect(badge.nativeElement.textContent).toContain('2');
    });
  });

  it('should contain router-outlet', () => {
    const routerOutlet = fixture.debugElement.query(By.css('router-outlet'));
    expect(routerOutlet).toBeTruthy();
  });
});
