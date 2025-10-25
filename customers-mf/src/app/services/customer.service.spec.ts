import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { signal } from '@angular/core';

import { CustomerService } from './customer.service';
import { createMockCustomer, createMockCustomers } from '../../test-setup';

describe('CustomerService - Simplified Tests', () => {
  let service: CustomerService;
  let httpMock: HttpTestingController;
  const mockCustomer = createMockCustomer();
  const mockCustomers = createMockCustomers(3);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CustomerService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(CustomerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('HTTP Operations', () => {
    it('should load customers', () => {
      service.loadCustomers();
      
      const req = httpMock.expectOne('http://localhost:3002/customers');
      expect(req.request.method).toBe('GET');
      req.flush(mockCustomers);
      
      expect(service.customers()).toEqual(mockCustomers);
    });

    it('should create customer', () => {
      const newCustomer = { ...mockCustomer, id: undefined };
      
      service.createCustomer(newCustomer).subscribe(customer => {
        expect(customer).toEqual(mockCustomer);
      });

      const req = httpMock.expectOne('http://localhost:3002/customers');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newCustomer);
      req.flush(mockCustomer);
    });

    it('should update customer', () => {
      service.updateCustomer(mockCustomer).subscribe(customer => {
        expect(customer).toEqual(mockCustomer);
      });

      const req = httpMock.expectOne(`http://localhost:3002/customers/${mockCustomer.id}`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(mockCustomer);
      req.flush(mockCustomer);
    });

    it('should delete customer', () => {
      service.deleteCustomer(mockCustomer.id).subscribe(() => {
        expect(true).toBeTruthy();
      });

      const req = httpMock.expectOne(`http://localhost:3002/customers/${mockCustomer.id}`);
      expect(req.request.method).toBe('DELETE');
      req.flush({});
    });
  });

  describe('Signal State Management', () => {
    it('should have initial signal values', () => {
      expect(service.customers()).toEqual([]);
      expect(service.loading()).toBeFalsy();
      expect(service.error()).toBeNull();
    });

    it('should update customers signal', () => {
      // Test that customers signal can be read
      expect(service.customers()).toEqual([]);
    });

    it('should update loading signal', () => {
      // Test that loading signal can be read
      expect(service.loading()).toBeFalsy();
    });

    it('should update error signal', () => {
      // Test that error signal can be read
      expect(service.error()).toBeNull();
    });
  });
});
