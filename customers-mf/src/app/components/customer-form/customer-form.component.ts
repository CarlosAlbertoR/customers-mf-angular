import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  template: `
    <div class="customer-form-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>
            {{ isEditMode() ? 'Edit Customer' : 'Add New Customer' }}
          </mat-card-title>
          <mat-card-subtitle>
            {{ isEditMode() ? 'Update customer information' : 'Fill in the customer details' }}
          </mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          @if (customerService.loading()) {
          <div class="loading-container">
            <mat-spinner></mat-spinner>
            <p>{{ isEditMode() ? 'Loading customer...' : 'Saving customer...' }}</p>
          </div>
          } @else {
          <form [formGroup]="customerForm" (ngSubmit)="onSubmit()" class="customer-form">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Name</mat-label>
              <input matInput formControlName="name" placeholder="Enter customer name" />
              @if (customerForm.get('name')?.invalid && customerForm.get('name')?.touched) {
              <mat-error>
                @if (customerForm.get('name')?.errors?.['required']) { Name is required } @if
                (customerForm.get('name')?.errors?.['minlength']) { Name must be at least 2
                characters }
              </mat-error>
              }
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Email</mat-label>
              <input
                matInput
                formControlName="email"
                placeholder="Enter email address"
                type="email"
              />
              @if (customerForm.get('email')?.invalid && customerForm.get('email')?.touched) {
              <mat-error>
                @if (customerForm.get('email')?.errors?.['required']) { Email is required } @if
                (customerForm.get('email')?.errors?.['email']) { Please enter a valid email address
                }
              </mat-error>
              }
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Phone</mat-label>
              <input matInput formControlName="phone" placeholder="Enter phone number" />
              @if (customerForm.get('phone')?.invalid && customerForm.get('phone')?.touched) {
              <mat-error>
                @if (customerForm.get('phone')?.errors?.['required']) { Phone is required } @if
                (customerForm.get('phone')?.errors?.['pattern']) { Please enter a valid phone number
                }
              </mat-error>
              }
            </mat-form-field>
          </form>
          }
        </mat-card-content>

        <mat-card-actions>
          <button mat-button type="button" (click)="onCancel()">
            <mat-icon>cancel</mat-icon>
            Cancel
          </button>
          <button
            mat-raised-button
            color="primary"
            type="submit"
            [disabled]="customerForm.invalid || customerService.loading()"
            (click)="onSubmit()"
          >
            @if (customerService.loading()) {
            <mat-spinner diameter="20"></mat-spinner>
            } @else {
            <mat-icon>{{ isEditMode() ? 'save' : 'add' }}</mat-icon>
            }
            {{ isEditMode() ? 'Update Customer' : 'Add Customer' }}
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .customer-form-container {
        max-width: 600px;
        margin: 0 auto;
      }

      .loading-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 40px;
        gap: 16px;
      }

      .customer-form {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .full-width {
        width: 100%;
      }

      mat-card-actions {
        display: flex;
        justify-content: flex-end;
        gap: 16px;
      }
    `,
  ],
})
export class CustomerFormComponent implements OnInit {
  customerForm: FormGroup;
  private customerId: string | null = null;

  // Signals for reactive state
  isEditMode = signal<boolean>(false);
  customer = signal<Customer | null>(null);

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.customerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[\+]?[1-9][\d]{0,15}$/)]],
    });
  }

  ngOnInit(): void {
    this.customerId = this.route.snapshot.paramMap.get('id');

    if (this.customerId) {
      this.isEditMode.set(true);
      this.loadCustomer();
    }
  }

  private loadCustomer(): void {
    if (this.customerId) {
      this.customerService.getCustomerById(this.customerId).subscribe({
        next: (customer) => {
          this.customer.set(customer);
          this.customerForm.patchValue({
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
          });
        },
        error: (error) => {
          this.snackBar.open('Error loading customer', 'Close', {
            duration: 3000,
          });
          console.error('Error loading customer:', error);
          this.router.navigate(['/customers']);
        },
      });
    }
  }

  onSubmit(): void {
    if (this.customerForm.valid) {
      const formValue = this.customerForm.value;

      if (this.isEditMode()) {
        this.updateCustomer(formValue);
      } else {
        this.createCustomer(formValue);
      }
    } else {
      this.markFormGroupTouched();
    }
  }

  private createCustomer(customerData: any): void {
    this.customerService.createCustomer(customerData).subscribe({
      next: (customer) => {
        this.snackBar.open('Customer created successfully', 'Close', {
          duration: 3000,
        });
        this.router.navigate(['/customers']);
      },
      error: (error) => {
        this.snackBar.open('Error creating customer', 'Close', {
          duration: 3000,
        });
        console.error('Error creating customer:', error);
      },
    });
  }

  private updateCustomer(customerData: any): void {
    if (this.customerId) {
      const updateData = {
        id: this.customerId,
        ...customerData,
      };

      this.customerService.updateCustomer(updateData).subscribe({
        next: (customer) => {
          this.snackBar.open('Customer updated successfully', 'Close', {
            duration: 3000,
          });
          this.router.navigate(['/customers']);
        },
        error: (error) => {
          this.snackBar.open('Error updating customer', 'Close', {
            duration: 3000,
          });
          console.error('Error updating customer:', error);
        },
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/customers']);
  }

  private markFormGroupTouched(): void {
    Object.keys(this.customerForm.controls).forEach((key) => {
      const control = this.customerForm.get(key);
      control?.markAsTouched();
    });
  }
}
