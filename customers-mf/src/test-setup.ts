import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

// Initialize the Angular testing environment only once
if (!getTestBed().platform) {
  getTestBed().initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting(),
  );
}

// Global test utilities
declare global {
  namespace jasmine {
    interface Matchers<T> {
      toHaveBeenCalledWithSignal(expected: any): boolean;
      toHaveSignalValue(expected: any): boolean;
    }
  }
}

// Custom matchers for Angular Signals
beforeEach(() => {
  // Clean up TestBed before each test
  getTestBed().resetTestingModule();
  
  jasmine.addMatchers({
    toHaveBeenCalledWithSignal: () => ({
      compare: (actual: any, expected: any) => {
        const result = {
          pass: false,
          message: ''
        };
        
        if (typeof actual === 'function') {
          const signalValue = actual();
          result.pass = (signalValue as any) === expected || JSON.stringify(signalValue) === JSON.stringify(expected);
          result.message = result.pass 
            ? `Expected signal not to have value ${expected}`
            : `Expected signal to have value ${expected}, but got ${signalValue}`;
        }
        
        return result;
      }
    }),
    
    toHaveSignalValue: () => ({
      compare: (actual: any, expected: any) => {
        const result = {
          pass: false,
          message: ''
        };
        
        if (typeof actual === 'function') {
          const signalValue = actual();
          result.pass = (signalValue as any) === expected || JSON.stringify(signalValue) === JSON.stringify(expected);
          result.message = result.pass 
            ? `Expected signal not to have value ${expected}`
            : `Expected signal to have value ${expected}, but got ${signalValue}`;
        }
        
        return result;
      }
    })
  });
});

// Test data factories
export const createMockCustomer = (overrides: Partial<any> = {}) => ({
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+1234567890',
  company: 'TechCorp',
  position: 'Developer',
  address: '123 Main St',
  city: 'New York',
  country: 'USA',
  website: 'https://techcorp.com',
  notes: 'VIP customer',
  status: 'active' as const,
  createdAt: new Date('2025-01-01T00:00:00.000Z'),
  updatedAt: new Date('2025-01-01T00:00:00.000Z'),
  ...overrides
});

export const createMockCustomers = (count: number = 3) => 
  Array.from({ length: count }, (_, index) => 
    createMockCustomer({
      id: `${index + 1}`,
      name: `Customer ${index + 1}`,
      email: `customer${index + 1}@example.com`
    })
  );

// Signal testing utilities
export const expectSignal = (signal: () => any, expectedValue: any) => {
  expect(signal()).toEqual(expectedValue);
};

export const expectSignalToChange = (signal: () => any, action: () => void, expectedValue: any) => {
  const initialValue = signal();
  action();
  expect(signal()).toEqual(expectedValue);
  expect(signal()).not.toEqual(initialValue);
};

// HTTP testing utilities
export const createMockHttpResponse = <T>(data: T, status: number = 200) => ({
  body: data,
  status,
  statusText: status === 200 ? 'OK' : 'Error',
  headers: new Map(),
  url: 'http://localhost:3002'
});

// Store testing utilities
export const createMockStoreState = (overrides: any = {}) => ({
  customers: [],
  loading: false,
  error: null,
  searchQuery: '',
  statusFilter: '',
  ...overrides
});
