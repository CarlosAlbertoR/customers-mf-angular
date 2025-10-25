import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer.model';
import { CustomerDeleteDialogComponent } from '../customer-delete-dialog/customer-delete-dialog.component';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ],
  template: `
    <div class="customer-list-container">
      <div class="header-section">
        <div class="title-section">
          <h1 class="page-title">
            <span class="title-icon">👥</span>
            Customer Management
          </h1>
          <p class="page-subtitle">Manage your customer database efficiently</p>
        </div>
        
        <div class="action-section">
          <button class="add-customer-btn" (click)="loadCustomers()">
            <span class="btn-icon">🔄</span>
            Refresh
          </button>
        </div>
      </div>

      <div class="main-card">
        @if (customerService.loading()) {
          <div class="loading-container">
            <div class="spinner"></div>
            <p class="loading-text">Loading customers...</p>
          </div>
        } @else if (customerService.error()) {
          <div class="error-container">
            <div class="error-icon">⚠️</div>
            <h3 class="error-title">Unable to load customers</h3>
            <p class="error-message">{{ customerService.error() }}</p>
            <button class="retry-btn" (click)="loadCustomers()">
              <span class="btn-icon">🔄</span>
              Try Again
            </button>
          </div>
        } @else {
          <div class="table-container">
            @if (customers().length === 0) {
              <div class="empty-state">
                <div class="empty-icon">👤</div>
                <h3 class="empty-title">No customers found</h3>
                <p class="empty-message">Start by adding your first customer to the database.</p>
              </div>
            } @else {
              <div class="table-header">
                <div class="table-title">
                  <h2>Customers ({{ customers().length }})</h2>
                </div>
                <div class="table-actions">
                  <button class="icon-btn" (click)="loadCustomers()" title="Refresh">
                    🔄
                  </button>
                </div>
              </div>

              <div class="customers-grid">
                @for (customer of customers(); track customer.id) {
                  <div class="customer-card">
                    <div class="customer-avatar">
                      {{ customer.name.charAt(0).toUpperCase() }}
                    </div>
                    <div class="customer-info">
                      <h3 class="customer-name">{{ customer.name }}</h3>
                      <div class="customer-details">
                        <div class="detail-item">
                          <span class="detail-icon">📧</span>
                          <a href="mailto:{{ customer.email }}" class="detail-link">
                            {{ customer.email }}
                          </a>
                        </div>
                        <div class="detail-item">
                          <span class="detail-icon">📞</span>
                          <a href="tel:{{ customer.phone }}" class="detail-link">
                            {{ customer.phone }}
                          </a>
                        </div>
                      </div>
                    </div>
                    <div class="customer-actions">
                      <button class="action-btn edit-btn" title="Edit customer">
                        ✏️
                      </button>
                      <button class="action-btn delete-btn" (click)="deleteCustomer(customer)" title="Delete customer">
                        🗑️
                      </button>
                    </div>
                  </div>
                }
              </div>
            }
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .customer-list-container {
      padding: 24px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .header-section {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 32px;
      flex-wrap: wrap;
      gap: 20px;
    }

    .title-section {
      flex: 1;
    }

    .page-title {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 2.5rem;
      font-weight: 700;
      color: white;
      margin: 0 0 8px 0;
      letter-spacing: -0.5px;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .title-icon {
      font-size: 2.5rem;
    }

    .page-subtitle {
      font-size: 1.1rem;
      color: rgba(255, 255, 255, 0.9);
      margin: 0;
      font-weight: 400;
    }

    .action-section {
      display: flex;
      align-items: center;
    }

    .add-customer-btn {
      background: rgba(255, 255, 255, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-radius: 12px;
      padding: 12px 24px;
      font-size: 1rem;
      font-weight: 600;
      color: white;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 8px;
      backdrop-filter: blur(10px);
    }

    .add-customer-btn:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    }

    .btn-icon {
      font-size: 1.1rem;
    }

    .main-card {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      border-radius: 20px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      overflow: hidden;
      min-height: 400px;
    }

    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 80px 40px;
    }

    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #f3f3f3;
      border-top: 4px solid #667eea;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .loading-text {
      margin-top: 24px;
      font-size: 1.1rem;
      color: #64748b;
      font-weight: 500;
    }

    .error-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 80px 40px;
      text-align: center;
    }

    .error-icon {
      font-size: 4rem;
      margin-bottom: 20px;
    }

    .error-title {
      font-size: 1.5rem;
      font-weight: 600;
      color: #1e293b;
      margin: 0 0 12px 0;
    }

    .error-message {
      font-size: 1rem;
      color: #64748b;
      margin: 0 0 24px 0;
      max-width: 400px;
    }

    .retry-btn {
      background: #667eea;
      color: white;
      border: none;
      border-radius: 8px;
      padding: 12px 20px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .retry-btn:hover {
      background: #5a67d8;
      transform: translateY(-1px);
    }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 80px 40px;
      text-align: center;
    }

    .empty-icon {
      font-size: 5rem;
      color: #cbd5e1;
      margin-bottom: 24px;
    }

    .empty-title {
      font-size: 1.5rem;
      font-weight: 600;
      color: #1e293b;
      margin: 0 0 12px 0;
    }

    .empty-message {
      font-size: 1rem;
      color: #64748b;
      margin: 0;
      max-width: 400px;
    }

    .table-container {
      padding: 0;
    }

    .table-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24px 32px 16px;
      border-bottom: 1px solid #e2e8f0;
    }

    .table-header h2 {
      font-size: 1.5rem;
      font-weight: 600;
      color: #1e293b;
      margin: 0;
    }

    .table-actions {
      display: flex;
      gap: 8px;
    }

    .icon-btn {
      background: none;
      border: none;
      padding: 8px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1.2rem;
      transition: all 0.2s ease;
      color: #64748b;
    }

    .icon-btn:hover {
      background: rgba(102, 126, 234, 0.1);
      color: #667eea;
    }

    .customers-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 20px;
      padding: 24px 32px 32px;
    }

    .customer-card {
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      padding: 20px;
      transition: all 0.2s ease;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .customer-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      border-color: #667eea;
    }

    .customer-avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 600;
      font-size: 1.2rem;
      margin-bottom: 16px;
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
    }

    .customer-info {
      margin-bottom: 16px;
    }

    .customer-name {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1e293b;
      margin: 0 0 12px 0;
    }

    .customer-details {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .detail-item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.95rem;
    }

    .detail-icon {
      font-size: 1rem;
    }

    .detail-link {
      color: #667eea;
      text-decoration: none;
      transition: color 0.2s ease;
    }

    .detail-link:hover {
      color: #4f46e5;
      text-decoration: underline;
    }

    .customer-actions {
      display: flex;
      gap: 8px;
      justify-content: flex-end;
    }

    .action-btn {
      width: 36px;
      height: 36px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s ease;
      font-size: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .edit-btn {
      background: rgba(59, 130, 246, 0.1);
      color: #3b82f6;
    }

    .edit-btn:hover {
      background: rgba(59, 130, 246, 0.2);
      transform: scale(1.1);
    }

    .delete-btn {
      background: rgba(239, 68, 68, 0.1);
      color: #ef4444;
    }

    .delete-btn:hover {
      background: rgba(239, 68, 68, 0.2);
      transform: scale(1.1);
    }

    @media (max-width: 768px) {
      .customer-list-container {
        padding: 16px;
      }

      .header-section {
        flex-direction: column;
        align-items: stretch;
        gap: 16px;
      }

      .page-title {
        font-size: 2rem;
      }

      .title-icon {
        font-size: 2rem;
      }

      .table-header {
        padding: 16px 20px 12px;
      }

      .table-header h2 {
        font-size: 1.25rem;
      }

      .customers-grid {
        grid-template-columns: 1fr;
        padding: 16px 20px 24px;
        gap: 16px;
      }
    }

    @media (max-width: 480px) {
      .customers-grid {
        grid-template-columns: 1fr;
      }
      
      .customer-card {
        padding: 16px;
      }
    }
  `]
})
export class CustomerListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'phone', 'actions'];

  // Using inject() function for dependency injection (modern Angular approach)
  customerService = inject(CustomerService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  // Computed signal for customers
  customers = computed(() => this.customerService.customers());

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.loadCustomers();
  }

  deleteCustomer(customer: Customer): void {
    const dialogRef = this.dialog.open(CustomerDeleteDialogComponent, {
      width: '400px',
      data: customer,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.customerService.deleteCustomer(customer.id).subscribe({
          next: () => {
            this.snackBar.open('Customer deleted successfully', 'Close', {
              duration: 3000,
            });
          },
          error: (error) => {
            this.snackBar.open('Error deleting customer', 'Close', {
              duration: 3000,
            });
            console.error('Error deleting customer:', error);
          },
        });
      }
    });
  }
}
