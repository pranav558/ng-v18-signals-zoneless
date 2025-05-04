import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { Item } from './cart';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('CartService', () => {
  let service: CartService;

  const testItem1: Item = { id: 1, title: 'Item 1', price: 100 };
  const testItem2: Item = { id: 2, title: 'Item 2', price: 50 };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CartService,
        provideExperimentalZonelessChangeDetection()
      ]
    });
    service = TestBed.inject(CartService);
  });

  afterEach(() => {
    service.cartItems.set([]);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('addToCart', () => {
    it('should add a new item to cart', () => {
      service.addToCart(testItem1);
      expect(service.cartItems().length).toBe(1);
      expect(service.cartItems()[0].detail).toEqual(testItem1);
      expect(service.cartItems()[0].quantity).toBe(1);
    });

    it('should increment quantity if item already exists', () => {
      service.addToCart(testItem1);
      service.addToCart(testItem1);
      expect(service.cartItems().length).toBe(1);
      expect(service.cartItems()[0].quantity).toBe(2);
    });

    it('should not affect other items when adding', () => {
      service.addToCart(testItem1);
      service.addToCart(testItem2);
      expect(service.cartItems().length).toBe(2);
    });
  });

  describe('updateInCart', () => {
    beforeEach(() => {
      service.addToCart(testItem1);
      service.addToCart(testItem2);
    });

    it('should update quantity of existing item', () => {
      service.updateInCart(testItem1, 5);
      expect(service.cartItems().find(i => i.detail.id === testItem1.id)?.quantity).toBe(5);
    });

    it('should not affect other items when updating', () => {
      service.updateInCart(testItem1, 5);
      expect(service.cartItems().find(i => i.detail.id === testItem2.id)?.quantity).toBe(1);
    });

    it('should do nothing if item not found', () => {
      const nonExistingItem: Item = { id: 99, title: 'Nonexistent', price: 0 };
      service.updateInCart(nonExistingItem, 5);
      expect(service.cartItems().length).toBe(2);
    });
  });

  describe('removeFromCart', () => {
    beforeEach(() => {
      service.addToCart(testItem1);
      service.addToCart(testItem2);
    });

    it('should remove specified item from cart', () => {
      service.removeFromCart(testItem1);
      expect(service.cartItems().length).toBe(1);
      expect(service.cartItems()[0].detail).toEqual(testItem2);
    });

    it('should do nothing if item not found', () => {
      const nonExistingItem: Item = { id: 99, title: 'Nonexistent', price: 0 };
      service.removeFromCart(nonExistingItem);
      expect(service.cartItems().length).toBe(2);
    });
  });

  describe('computed values', () => {
    beforeEach(() => {
      service.addToCart(testItem1);
      service.addToCart(testItem2);
    });

    it('should calculate cartCount correctly', () => {
      expect(service.cartCount()).toBe(2);
      service.addToCart(testItem1);
      expect(service.cartCount()).toBe(3);
    });

    it('should calculate subTotal correctly', () => {
      expect(service.subTotal()).toBe(150);
      service.addToCart(testItem1);
      expect(service.subTotal()).toBe(250);
    });

    describe('deliveryFee', () => {
      it('should be 100 when subTotal < 200', () => {
        expect(service.subTotal()).toBe(150);
        expect(service.deliveryFee()).toBe(100);
      });

      it('should be 0 when subTotal >= 200', () => {
        service.addToCart(testItem1);
        expect(service.subTotal()).toBe(250);
        expect(service.deliveryFee()).toBe(0);
      });
    });

    it('should calculate tax correctly (10.75%)', () => {
      expect(service.tax()).toBe(Math.round(150 * 10.75) / 100);
    });

    it('should calculate totalPrice correctly', () => {
      const expectedTotal = service.subTotal() + service.deliveryFee() + service.tax();
      expect(service.totalPrice()).toBe(expectedTotal);
    });

    it('should update computed values reactively', () => {
      const initialTotal = service.totalPrice();
      service.addToCart(testItem1);
      expect(service.totalPrice()).not.toBe(initialTotal);
    });
  });

  describe('signal behavior', () => {
    it('should maintain immutability when updating', () => {
      const initialItems = service.cartItems();
      service.addToCart(testItem1);
      expect(service.cartItems()).not.toBe(initialItems);
    });
  });
});
