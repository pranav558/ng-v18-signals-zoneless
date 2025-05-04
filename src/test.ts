import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

// First, initialize the Angular testing environment
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
  {
    teardown: { destroyAfterEach: true },
  }
);

// Then we find all the tests
// const context = require.context('./', true, /\.spec\.ts$/);

// // And load the modules
// context.keys().forEach(context);
// Replace the require.context section with:

// Optional: Add global mocks or utilities here
Object.defineProperty(window, 'localStorage', {
  value: {
    store: {} as Record<string, string>,
    getItem(key: string): string | null {
      return this.store[key] || null;
    },
    setItem(key: string, value: string) {
      this.store[key] = value;
    },
    removeItem(key: string) {
      delete this.store[key];
    },
    clear() {
      this.store = {};
    },
  },
  configurable: true,
});

// Mock for window.matchMedia
window.matchMedia = (query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jasmine.createSpy('addListener'), // deprecated
  removeListener: jasmine.createSpy('removeListener'), // deprecated
  addEventListener: jasmine.createSpy('addEventListener'),
  removeEventListener: jasmine.createSpy('removeEventListener'),
  dispatchEvent: jasmine.createSpy('dispatchEvent'),
});

// Mock for ResizeObserver if needed
if (!window.ResizeObserver) {
  window.ResizeObserver = class {
    observe = jasmine.createSpy('observe');
    unobserve = jasmine.createSpy('unobserve');
    disconnect = jasmine.createSpy('disconnect');
  } as any;
}

console.log('Angular zoneless test environment initialized with Karma');
