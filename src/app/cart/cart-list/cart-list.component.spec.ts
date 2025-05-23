import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartListComponent } from './cart-list.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('CartListComponent', () => {
  let component: CartListComponent;
  let fixture: ComponentFixture<CartListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartListComponent],
      providers: [provideExperimentalZonelessChangeDetection()],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
