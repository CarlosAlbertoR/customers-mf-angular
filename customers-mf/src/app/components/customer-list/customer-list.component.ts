import { Component, OnInit, signal, computed } from '@angular/core';
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
    MatProgressSpinnerModule
  ],
  template: `
    <div class="customer-list-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Customers</mat-card-title>
          <mat-card-subtitle>Manage your customer database</mat-card-subtitle>
        </mat-card-header>
        
        <mat-card-content>
          @if (customerService.loading()) {
            <div class="loading-container">
              <mat-spinner></mat-spinner>
              <p>Loading customers...</p>
            </div>
          } @else if (customerService.error()) {
            <div class="error-container">
              <mat-icon color="warn">error</mat-icon>
              <p>{{ customerService.error() }}</p>
              <button mat-button color="primary" (click)="loadCustomers()">
                Retry
              </button>
            </div>
          } @else {
            <div class="table-container">
              <table mat-table [dataSource]="customerService.customers()" class="customer-table">
                <!-- Name Column -->
                <ng-container matColumnDef="name">
                  <th mat-header-cell *matHeaderCellDef>Name</th>
                  <td mat-cell *matCellDef="let customer">{{ customer.name }}</td>
                </ng-container>

                <!-- Email Column -->
                <ng-container matColumnDef="email">
                  <th mat-header-cell *matHeaderCellDef>Email</th>
                  <td mat-cell *matCellDef="let customer">{{ customer.email }}</td>
                </ng-container>

                <!-- Phone Column -->
                <ng-container matColumnDef="phone">
                  <th mat-header-cell *matHeaderCellDef>Phone</th>
                  <td mat-cell *matCellDef="let customer">{{ customer.phone }}</td>
                </ng-container>

                <!-- Actions Column -->
                <ng-container matColumnDef="actions">
                  <th mat-header-cell *matHeaderCellDef>Actions</th>
                  <td mat-cell *matCellDef="let customer">
                    <button mat-icon-button color="primary" 
                            [routerLink]="['/customers', customer.id, 'edit']"
                            matTooltip="Edit customer">
                      <mat-icon>edit</mat-icon>
                    </button>
                    <button mat-icon-button color="warn" 
                            (click)="deleteCustomer(customer)"
                            matTooltip="Delete customer">
                      <mat-icon>delete</mat-icon>
                    </button>
                  </td>
                </ng-container>

                <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
              </table>

              @if (customerService.customers().length === 0) {
                <div class="empty-state">
                  <mat-icon>people</mat-icon>
                  <h3>No customers found</h3>
                  <p>Start by adding your first customer</p>
                  <button mat-raised-button color="primary" routerLink="/customers/new">
                    <mat-icon>add</mat-icon>
                    Add Customer
                  </button>
                </div>
              }
            </div>
          }
        </mat-card-content>
        
        <mat-card-actions>
          <button mat-raised-button color="primary" routerLink="/customers/new">
            <mat-icon>add</mat-icon>
            Add Customer
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .customer-list-container {
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .loading-container, .error-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 40px;
      gap: 16px;
    }
    
    .table-container {
      overflow-x: auto;
    }
    
    .customer-table {
      width: 100%;
    }
    
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 40px;
      gap: 16px;
      text-align: center;
    }
    
    .empty-state mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      color: #ccc;
    }
  `]
})
export class CustomerListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'phone', 'actions'];

  constructor(
    public customerService: CustomerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.loadCustomers();
  }

  deleteCustomer(customer: Customer): void {
    const dialogRef = this.dialog.open(CustomerDeleteDialogComponent, {
      width: '400px',
      data: customer
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.customerService.deleteCustomer(customer.id).subscribe({
          next: () => {
            this.snackBar.open('Customer deleted successfully', 'Close', {
              duration: 3000
            });
          },
          error: (error) => {
            this.snackBar.open('Error deleting customer', 'Close', {
              duration: 3000
            });
            console.error('Error deleting customer:', error);
          }
        });
      }
    });
  }
}
