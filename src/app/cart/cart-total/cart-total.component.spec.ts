import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartTotalComponent } from './cart-total.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('CartTotalComponent', () => {
  let component: CartTotalComponent;
  let fixture: ComponentFixture<CartTotalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartTotalComponent],
      providers: [provideExperimentalZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(CartTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
