import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Customer, CreateCustomerRequest, UpdateCustomerRequest } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private readonly API_URL = 'http://localhost:3000/customers';
  
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

  constructor(private http: HttpClient) {
    this.loadCustomers();
  }

  // Signal-based methods
  loadCustomers(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    
    this.http.get<Customer[]>(this.API_URL)
      .pipe(
        tap(customers => {
          this.customersSignal.set(customers);
          this.customersSubject.next(customers);
          this.loadingSignal.set(false);
        }),
        catchError(error => {
          this.errorSignal.set('Error loading customers');
          this.loadingSignal.set(false);
          return throwError(() => error);
        })
      )
      .subscribe();
  }

  createCustomer(customer: CreateCustomerRequest): Observable<Customer> {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    return this.http.post<Customer>(this.API_URL, customer)
      .pipe(
        tap(newCustomer => {
          const currentCustomers = this.customersSignal();
          this.customersSignal.set([...currentCustomers, newCustomer]);
          this.customersSubject.next([...currentCustomers, newCustomer]);
          this.loadingSignal.set(false);
        }),
        catchError(error => {
          this.errorSignal.set('Error creating customer');
          this.loadingSignal.set(false);
          return throwError(() => error);
        })
      );
  }

  updateCustomer(customer: UpdateCustomerRequest): Observable<Customer> {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    return this.http.put<Customer>(`${this.API_URL}/${customer.id}`, customer)
      .pipe(
        tap(updatedCustomer => {
          const currentCustomers = this.customersSignal();
          const index = currentCustomers.findIndex(c => c.id === customer.id);
          if (index !== -1) {
            const newCustomers = [...currentCustomers];
            newCustomers[index] = updatedCustomer;
            this.customersSignal.set(newCustomers);
            this.customersSubject.next(newCustomers);
          }
          this.loadingSignal.set(false);
        }),
        catchError(error => {
          this.errorSignal.set('Error updating customer');
          this.loadingSignal.set(false);
          return throwError(() => error);
        })
      );
  }

  deleteCustomer(id: string): Observable<void> {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    return this.http.delete<void>(`${this.API_URL}/${id}`)
      .pipe(
        tap(() => {
          const currentCustomers = this.customersSignal();
          const filteredCustomers = currentCustomers.filter(c => c.id !== id);
          this.customersSignal.set(filteredCustomers);
          this.customersSubject.next(filteredCustomers);
          this.loadingSignal.set(false);
        }),
        catchError(error => {
          this.errorSignal.set('Error deleting customer');
          this.loadingSignal.set(false);
          return throwError(() => error);
        })
      );
  }

  getCustomerById(id: string): Observable<Customer | undefined> {
    const customer = this.customersSignal().find(c => c.id === id);
    return customer ? of(customer) : throwError(() => new Error('Customer not found'));
  }

  // Traditional RxJS methods for backward compatibility
  getCustomers(): Observable<Customer[]> {
    return this.customers$;
  }
}
