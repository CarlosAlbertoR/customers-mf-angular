import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Customer, CreateCustomerRequest, UpdateCustomerRequest } from '../models/customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private readonly API_URL = 'http://localhost:3002/customers'; // JSON Server endpoint

  // Use inject() function for dependency injection
  private http = inject(HttpClient);

  // Signals for reactive state management
  private customersSignal = signal<Customer[]>([]);
  private loadingSignal = signal<boolean>(false);
  private errorSignal = signal<string | null>(null);

  // Computed signals
  customers = computed(() => this.customersSignal());
  loading = computed(() => this.loadingSignal());
  error = computed(() => this.errorSignal());

  // BehaviorSubject for traditional RxJS approach
  private customersSubject = new BehaviorSubject<Customer[]>([]);
  customers$ = this.customersSubject.asObservable();

  constructor() {
    this.loadCustomers();
  }

  // Signal-based methods
  loadCustomers(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.http
      .get<Customer[]>(this.API_URL)
      .pipe(
        tap((customers) => {
          // Convert date strings to Date objects
          const processedCustomers = customers.map(customer => ({
            ...customer,
            createdAt: new Date(customer.createdAt),
            updatedAt: new Date(customer.updatedAt)
          }));
          
          this.customersSignal.set(processedCustomers);
          this.customersSubject.next(processedCustomers);
          this.loadingSignal.set(false);
        }),
        catchError((error) => {
          console.error('Error loading customers:', error);
          this.errorSignal.set('Failed to load customers');
          this.loadingSignal.set(false);
          return throwError(() => error);
        })
      )
      .subscribe();
  }

  createCustomer(customer: CreateCustomerRequest): Observable<Customer> {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    return this.http.post<Customer>(this.API_URL, customer).pipe(
      tap((newCustomer) => {
        // Convert date strings to Date objects
        const processedCustomer = {
          ...newCustomer,
          createdAt: new Date(newCustomer.createdAt),
          updatedAt: new Date(newCustomer.updatedAt)
        };
        
        const currentCustomers = this.customersSignal();
        this.customersSignal.set([...currentCustomers, processedCustomer]);
        this.customersSubject.next([...currentCustomers, processedCustomer]);
        this.loadingSignal.set(false);
      }),
      catchError((error) => {
        this.errorSignal.set('Error creating customer');
        this.loadingSignal.set(false);
        return throwError(() => error);
      })
    );
  }

  updateCustomer(customer: UpdateCustomerRequest): Observable<Customer> {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    return this.http.put<Customer>(`${this.API_URL}/${customer.id}`, customer).pipe(
      tap((updatedCustomer) => {
        // Convert date strings to Date objects
        const processedCustomer = {
          ...updatedCustomer,
          createdAt: new Date(updatedCustomer.createdAt),
          updatedAt: new Date(updatedCustomer.updatedAt)
        };
        
        const currentCustomers = this.customersSignal();
        const index = currentCustomers.findIndex((c) => c.id === customer.id);
        if (index !== -1) {
          const newCustomers = [...currentCustomers];
          newCustomers[index] = processedCustomer;
          this.customersSignal.set(newCustomers);
          this.customersSubject.next(newCustomers);
        }
        this.loadingSignal.set(false);
      }),
      catchError((error) => {
        this.errorSignal.set('Error updating customer');
        this.loadingSignal.set(false);
        return throwError(() => error);
      })
    );
  }

  deleteCustomer(id: string): Observable<void> {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    return this.http.delete<void>(`${this.API_URL}/${id}`).pipe(
      tap(() => {
        const currentCustomers = this.customersSignal();
        const filteredCustomers = currentCustomers.filter((c) => c.id !== id);
        this.customersSignal.set(filteredCustomers);
        this.customersSubject.next(filteredCustomers);
        this.loadingSignal.set(false);
      }),
      catchError((error) => {
        this.errorSignal.set('Error deleting customer');
        this.loadingSignal.set(false);
        return throwError(() => error);
      })
    );
  }

  getCustomerById(id: string): Observable<Customer> {
    return this.http.get<Customer>(`${this.API_URL}/${id}`).pipe(
      map(customer => ({
        ...customer,
        createdAt: new Date(customer.createdAt),
        updatedAt: new Date(customer.updatedAt)
      })),
      catchError((error) => {
        console.error('Error getting customer by ID:', error);
        return throwError(() => new Error('Customer not found'));
      })
    );
  }

  // Advanced search and filtering methods using API
  searchCustomers(query: string): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.API_URL}?q=${encodeURIComponent(query)}`).pipe(
      map(customers => customers.map(customer => ({
        ...customer,
        createdAt: new Date(customer.createdAt),
        updatedAt: new Date(customer.updatedAt)
      }))),
      catchError((error) => {
        console.error('Error searching customers:', error);
        return of([]);
      })
    );
  }

  filterCustomersByStatus(status: 'active' | 'inactive' | 'pending'): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.API_URL}?status=${status}`).pipe(
      map(customers => customers.map(customer => ({
        ...customer,
        createdAt: new Date(customer.createdAt),
        updatedAt: new Date(customer.updatedAt)
      }))),
      catchError((error) => {
        console.error('Error filtering customers by status:', error);
        return of([]);
      })
    );
  }

  filterCustomersByCompany(company: string): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.API_URL}?company_like=${encodeURIComponent(company)}`).pipe(
      map(customers => customers.map(customer => ({
        ...customer,
        createdAt: new Date(customer.createdAt),
        updatedAt: new Date(customer.updatedAt)
      }))),
      catchError((error) => {
        console.error('Error filtering customers by company:', error);
        return of([]);
      })
    );
  }

  getCustomersByCountry(country: string): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.API_URL}?country_like=${encodeURIComponent(country)}`).pipe(
      map(customers => customers.map(customer => ({
        ...customer,
        createdAt: new Date(customer.createdAt),
        updatedAt: new Date(customer.updatedAt)
      }))),
      catchError((error) => {
        console.error('Error filtering customers by country:', error);
        return of([]);
      })
    );
  }

  getActiveCustomers(): Observable<Customer[]> {
    return this.filterCustomersByStatus('active');
  }

  getPendingCustomers(): Observable<Customer[]> {
    return this.filterCustomersByStatus('pending');
  }

  getInactiveCustomers(): Observable<Customer[]> {
    return this.filterCustomersByStatus('inactive');
  }

  // Statistics methods
  getCustomerStats(): Observable<{
    total: number;
    active: number;
    inactive: number;
    pending: number;
    byCountry: { [key: string]: number };
    byCompany: { [key: string]: number };
  }> {
    const customers = this.customersSignal();
    const stats = {
      total: customers.length,
      active: customers.filter(c => c.status === 'active').length,
      inactive: customers.filter(c => c.status === 'inactive').length,
      pending: customers.filter(c => c.status === 'pending').length,
      byCountry: {} as { [key: string]: number },
      byCompany: {} as { [key: string]: number }
    };

    // Count by country
    customers.forEach(customer => {
      if (customer.country) {
        stats.byCountry[customer.country] = (stats.byCountry[customer.country] || 0) + 1;
      }
    });

    // Count by company
    customers.forEach(customer => {
      if (customer.company) {
        stats.byCompany[customer.company] = (stats.byCompany[customer.company] || 0) + 1;
      }
    });

    return of(stats);
  }

  // Traditional RxJS methods for backward compatibility
  getCustomers(): Observable<Customer[]> {
    return this.customers$;
  }
}
