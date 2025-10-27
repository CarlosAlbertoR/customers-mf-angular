import { signalStore, withState, withComputed, withMethods, patchState } from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError, of, tap } from 'rxjs';
import { Customer, CreateCustomerRequest, UpdateCustomerRequest } from '../models/customer.model';
import { environment } from '../../environments/environment';

interface CustomerState {
  customers: Customer[];
  loading: boolean;
  error: string | null;
  selectedCustomer: Customer | null;
  searchQuery: string;
  statusFilter: string;
}

const initialState: CustomerState = {
  customers: [],
  loading: false,
  error: null,
  selectedCustomer: null,
  searchQuery: '',
  statusFilter: ''
};

export const CustomerStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  
  withComputed((store) => ({
    // Computed signals para métricas
    totalCustomers: computed(() => store.customers().length),
    
    activeCustomers: computed(() => 
      store.customers().filter(c => c.status === 'active').length
    ),
    
    inactiveCustomers: computed(() => 
      store.customers().filter(c => c.status === 'inactive').length
    ),
    
    pendingCustomers: computed(() => 
      store.customers().filter(c => c.status === 'pending').length
    ),
    
    recentCustomers: computed(() => {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      return store.customers().filter(c => new Date(c.createdAt) > oneMonthAgo).length;
    }),
    
    growthPercentage: computed(() => {
      const currentMonth = new Date();
      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1);
      
      const currentMonthCustomers = store.customers().filter(c => {
        const createdDate = new Date(c.createdAt);
        return createdDate.getMonth() === currentMonth.getMonth() && 
               createdDate.getFullYear() === currentMonth.getFullYear();
      }).length;
      
      const lastMonthCustomers = store.customers().filter(c => {
        const createdDate = new Date(c.createdAt);
        return createdDate.getMonth() === lastMonth.getMonth() && 
               createdDate.getFullYear() === lastMonth.getFullYear();
      }).length;
      
      if (lastMonthCustomers === 0) {
        return currentMonthCustomers > 0 ? '+100%' : '0%';
      }
      
      const growth = ((currentMonthCustomers - lastMonthCustomers) / lastMonthCustomers) * 100;
      return growth >= 0 ? `+${Math.round(growth)}%` : `${Math.round(growth)}%`;
    }),
    
    // Filtrado combinado
    filteredCustomers: computed(() => {
      let filtered = store.customers();
      
      // Aplicar filtro de búsqueda
      const query = store.searchQuery().toLowerCase();
      if (query) {
        filtered = filtered.filter(customer => 
          customer.name.toLowerCase().includes(query) ||
          customer.email.toLowerCase().includes(query) ||
          customer.company?.toLowerCase().includes(query) ||
          customer.position?.toLowerCase().includes(query) ||
          customer.city?.toLowerCase().includes(query) ||
          customer.country?.toLowerCase().includes(query)
        );
      }
      
      // Aplicar filtro de estado
      const status = store.statusFilter();
      if (status) {
        filtered = filtered.filter(customer => customer.status === status);
      }
      
      return filtered;
    }),
    
    // Estados de UI
    hasError: computed(() => !!store.error()),
    hasCustomers: computed(() => store.customers().length > 0),
    isLoading: computed(() => store.loading())
  })),
  
  withMethods((store) => {
    const http = inject(HttpClient);
    const API_URL = environment.apiUrl;
    
    return {
      // Cargar todos los clientes
      loadCustomers() {
        patchState(store, { loading: true, error: null });
        
        return http.get<Customer[]>(API_URL).pipe(
          map(customers => customers.map(customer => ({
            ...customer,
            createdAt: new Date(customer.createdAt),
            updatedAt: new Date(customer.updatedAt)
          }))),
          tap(customers => {
            patchState(store, { customers, loading: false });
          }),
          catchError(error => {
            patchState(store, { 
              error: 'Failed to load customers', 
              loading: false 
            });
            return of([]);
          })
        );
      },
      
      // Crear nuevo cliente
      createCustomer(customer: CreateCustomerRequest) {
        patchState(store, { loading: true, error: null });
        
        return http.post<Customer>(API_URL, customer).pipe(
          map(newCustomer => ({
            ...newCustomer,
            createdAt: new Date(newCustomer.createdAt),
            updatedAt: new Date(newCustomer.updatedAt)
          })),
          tap(newCustomer => {
            const currentCustomers = store.customers();
            patchState(store, { 
              customers: [...currentCustomers, newCustomer],
              loading: false 
            });
          }),
          catchError(error => {
            patchState(store, { 
              error: 'Error creating customer', 
              loading: false 
            });
            throw error;
          })
        );
      },
      
      // Actualizar cliente
      updateCustomer(customer: UpdateCustomerRequest) {
        patchState(store, { loading: true, error: null });
        
        return http.put<Customer>(`${API_URL}/${customer.id}`, customer).pipe(
          map(updatedCustomer => ({
            ...updatedCustomer,
            createdAt: new Date(updatedCustomer.createdAt),
            updatedAt: new Date(updatedCustomer.updatedAt)
          })),
          tap(updatedCustomer => {
            const currentCustomers = store.customers();
            const index = currentCustomers.findIndex(c => c.id === customer.id);
            if (index !== -1) {
              const newCustomers = [...currentCustomers];
              newCustomers[index] = updatedCustomer;
              patchState(store, { 
                customers: newCustomers,
                loading: false 
              });
            }
          }),
          catchError(error => {
            patchState(store, { 
              error: 'Error updating customer', 
              loading: false 
            });
            throw error;
          })
        );
      },
      
      // Eliminar cliente
      deleteCustomer(id: string) {
        patchState(store, { loading: true, error: null });
        
        return http.delete<void>(`${API_URL}/${id}`).pipe(
          tap(() => {
            const currentCustomers = store.customers();
            const filteredCustomers = currentCustomers.filter(c => c.id !== id);
            patchState(store, { 
              customers: filteredCustomers,
              loading: false 
            });
          }),
          catchError(error => {
            patchState(store, { 
              error: 'Error deleting customer', 
              loading: false 
            });
            throw error;
          })
        );
      },
      
      // Obtener cliente por ID
      getCustomerById(id: string) {
        return http.get<Customer>(`${API_URL}/${id}`).pipe(
          map(customer => ({
            ...customer,
            createdAt: new Date(customer.createdAt),
            updatedAt: new Date(customer.updatedAt)
          })),
          catchError(error => {
            patchState(store, { error: 'Customer not found' });
            throw error;
          })
        );
      },
      
      // Seleccionar cliente
      selectCustomer(customer: Customer | null) {
        patchState(store, { selectedCustomer: customer });
      },
      
      // Actualizar búsqueda
      setSearchQuery(query: string) {
        patchState(store, { searchQuery: query });
      },
      
      // Actualizar filtro de estado
      setStatusFilter(status: string) {
        patchState(store, { statusFilter: status });
      },
      
      // Limpiar error
      clearError() {
        patchState(store, { error: null });
      },
      
      // Resetear store
      reset() {
        patchState(store, initialState);
      }
    };
  })
);
