import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-customer-form',
  standalone: true,
    imports: [
      CommonModule,
      ReactiveFormsModule,
      MatCardModule,
      MatButtonModule,
      MatIconModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatSnackBarModule,
      MatProgressSpinnerModule,
    ],
  template: `
    <div class="customer-form-container">
      <div class="form-header">
        <div class="header-content">
          <div class="header-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" fill="currentColor"/>
              <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" fill="currentColor"/>
              <path d="M20 7C20 8.10457 19.1046 9 18 9C16.8954 9 16 8.10457 16 7C16 5.89543 16.8954 5 18 5C19.1046 5 20 5.89543 20 7Z" fill="currentColor"/>
              <path d="M18 14C15.7909 14 14 15.7909 14 18V21H22V18C22 15.7909 20.2091 14 18 14Z" fill="currentColor"/>
            </svg>
          </div>
          <div class="header-text">
            <h1>{{ isEditMode() ? 'Edit Customer' : 'Add New Customer' }}</h1>
            <p>{{ isEditMode() ? 'Update customer information' : 'Create a new customer profile' }}</p>
          </div>
        </div>
      </div>

      <div class="form-content">
        <mat-card class="form-card">
          <mat-card-content>
            <form [formGroup]="customerForm" (ngSubmit)="onSubmit()" class="customer-form">
              <!-- Personal Information Section -->
              <div class="form-section">
                <h3 class="section-title">Personal Information</h3>
                <div class="form-grid">
                  <div class="form-field-wrapper">
                    <mat-form-field appearance="outline" class="full-width">
                      <mat-label>Full Name *</mat-label>
                      <input matInput formControlName="name" placeholder="Enter customer name" />
                      <mat-icon matSuffix>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20 21V19C20 17.134 16.866 14 13 14H11C7.134 14 4 17.134 4 21V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </mat-icon>
                      @if (customerForm.get('name')?.invalid && customerForm.get('name')?.touched) {
                        <mat-error>
                          @if (customerForm.get('name')?.errors?.['required']) {
                            Name is required
                          } @else if (customerForm.get('name')?.errors?.['minlength']) {
                            Name must be at least 2 characters
                          }
                        </mat-error>
                      }
                    </mat-form-field>
                  </div>

                  <div class="form-field-wrapper">
                    <mat-form-field appearance="outline" class="full-width">
                      <mat-label>Email Address *</mat-label>
                      <input matInput formControlName="email" type="email" placeholder="Enter email address" />
                      <mat-icon matSuffix>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M22 6L12 13L2 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </mat-icon>
                      @if (customerForm.get('email')?.invalid && customerForm.get('email')?.touched) {
                        <mat-error>
                          @if (customerForm.get('email')?.errors?.['required']) {
                            Email is required
                          } @else if (customerForm.get('email')?.errors?.['email']) {
                            Please enter a valid email address
                          }
                        </mat-error>
                      }
                    </mat-form-field>
                  </div>

                  <div class="form-field-wrapper">
                    <mat-form-field appearance="outline" class="full-width">
                      <mat-label>Phone Number *</mat-label>
                      <input matInput formControlName="phone" placeholder="Enter phone number" />
                      <mat-icon matSuffix>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.18999 12.85C3.49997 10.2412 2.44824 7.27099 2.11999 4.18C2.095 3.90347 2.12787 3.62476 2.21649 3.36162C2.30512 3.09849 2.44756 2.85669 2.63476 2.65162C2.82196 2.44655 3.0498 2.28271 3.30379 2.17052C3.55777 2.05833 3.83233 2.00026 4.10999 2H7.10999C7.59531 1.99522 8.06679 2.16708 8.43376 2.48353C8.80073 2.79999 9.03996 3.23945 9.10999 3.72C9.23662 4.68007 9.47144 5.62273 9.80999 6.53C9.94454 6.88792 9.97366 7.27691 9.8939 7.65088C9.81415 8.02485 9.62886 8.36811 9.35999 8.64L8.08999 9.91C9.51355 12.4135 11.5865 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9751 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0555 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </mat-icon>
                      @if (customerForm.get('phone')?.invalid && customerForm.get('phone')?.touched) {
                        <mat-error>
                          @if (customerForm.get('phone')?.errors?.['required']) {
                            Phone number is required
                          } @else if (customerForm.get('phone')?.errors?.['pattern']) {
                            Please enter a valid phone number
                          }
                        </mat-error>
                      }
                    </mat-form-field>
                  </div>

                  <div class="form-field-wrapper">
                    <mat-form-field appearance="outline" class="full-width">
                      <mat-label>Status</mat-label>
                      <mat-select formControlName="status">
                        <mat-option value="active">Active</mat-option>
                        <mat-option value="inactive">Inactive</mat-option>
                        <mat-option value="pending">Pending</mat-option>
                      </mat-select>
                      <mat-icon matSuffix>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </mat-icon>
                    </mat-form-field>
                  </div>
                </div>
              </div>

              <!-- Professional Information Section -->
              <div class="form-section">
                <h3 class="section-title">Professional Information</h3>
                <div class="form-grid">
                  <div class="form-field-wrapper">
                    <mat-form-field appearance="outline" class="full-width">
                      <mat-label>Company</mat-label>
                      <input matInput formControlName="company" placeholder="Enter company name" />
                      <mat-icon matSuffix>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3 21H21M5 21V8L12 3L19 8V21M9 9V17M15 9V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </mat-icon>
                    </mat-form-field>
                  </div>

                  <div class="form-field-wrapper">
                    <mat-form-field appearance="outline" class="full-width">
                      <mat-label>Position</mat-label>
                      <input matInput formControlName="position" placeholder="Enter job position" />
                      <mat-icon matSuffix>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M16 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6C4 4.89543 4.89543 4 6 4H8M16 4C16 2.89543 15.1046 2 14 2H10C8.89543 2 8 2.89543 8 4M16 4C16 5.10457 15.1046 6 14 6H10C8.89543 6 8 5.10457 8 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </mat-icon>
                    </mat-form-field>
                  </div>

                  <div class="form-field-wrapper full-width">
                    <mat-form-field appearance="outline" class="full-width">
                      <mat-label>Website</mat-label>
                      <input matInput formControlName="website" placeholder="https://company.com" />
                      <mat-icon matSuffix>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10 13A5 5 0 0 0 20 13M16 16A4 4 0 0 0 8 16M12 7A5 5 0 1 1 12 17A5 5 0 0 1 12 7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </mat-icon>
                      @if (customerForm.get('website')?.invalid && customerForm.get('website')?.touched) {
                        <mat-error>
                          @if (customerForm.get('website')?.errors?.['pattern']) {
                            Please enter a valid URL (e.g., https://example.com)
                          }
                        </mat-error>
                      }
                    </mat-form-field>
                  </div>
                </div>
              </div>

              <!-- Address Information Section -->
              <div class="form-section">
                <h3 class="section-title">Address Information</h3>
                <div class="form-grid">
                  <div class="form-field-wrapper full-width">
                    <mat-form-field appearance="outline" class="full-width">
                      <mat-label>Address</mat-label>
                      <input matInput formControlName="address" placeholder="Enter street address" />
                      <mat-icon matSuffix>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M21 10C21 17 12 23 12 23S3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.3639 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          <circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </mat-icon>
                    </mat-form-field>
                  </div>

                  <div class="form-field-wrapper">
                    <mat-form-field appearance="outline" class="full-width">
                      <mat-label>City</mat-label>
                      <input matInput formControlName="city" placeholder="Enter city" />
                      <mat-icon matSuffix>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3 21H21M5 21V8L12 3L19 8V21M9 9V17M15 9V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </mat-icon>
                    </mat-form-field>
                  </div>

                  <div class="form-field-wrapper">
                    <mat-form-field appearance="outline" class="full-width">
                      <mat-label>Country</mat-label>
                      <input matInput formControlName="country" placeholder="Enter country" />
                      <mat-icon matSuffix>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M12 6V12L16 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </mat-icon>
                    </mat-form-field>
                  </div>
                </div>
              </div>

              <!-- Additional Information Section -->
              <div class="form-section">
                <h3 class="section-title">Additional Information</h3>
                <div class="form-grid">
                  <div class="form-field-wrapper full-width">
                    <mat-form-field appearance="outline" class="full-width">
                      <mat-label>Notes</mat-label>
                      <textarea matInput formControlName="notes" placeholder="Enter any additional notes about the customer" rows="4"></textarea>
                      <mat-icon matSuffix>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M14 2V8H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </mat-icon>
                    </mat-form-field>
                  </div>
                </div>
              </div>

              <div class="form-actions">
                <button type="button" mat-stroked-button (click)="onCancel()" class="cancel-button">
                  <mat-icon>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </mat-icon>
                  Cancel
                </button>
                <button type="submit" mat-raised-button color="primary" [disabled]="customerForm.invalid || isLoading()" class="submit-button">
                  @if (isLoading()) {
                    <mat-spinner diameter="20"></mat-spinner>
                  } @else {
                    <mat-icon>
                      @if (isEditMode()) {
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      } @else {
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      }
                    </mat-icon>
                  }
                  {{ isEditMode() ? 'Update Customer' : 'Create Customer' }}
                </button>
              </div>
            </form>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [
    `
      .customer-form-container {
        width: 100%;
        min-height: 100vh;
        background: transparent;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      }

      .form-header {
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.95) 100%);
        backdrop-filter: blur(20px);
        border-bottom: 1px solid rgba(0, 0, 0, 0.12);
        padding: 2.5rem 0;
        margin-bottom: 2rem;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        position: relative;
      }

      .form-header::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, rgba(102, 126, 234, 0.02) 0%, rgba(118, 75, 162, 0.02) 100%);
        pointer-events: none;
      }

      .header-content {
        max-width: 800px;
        margin: 0 auto;
        padding: 0 2rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        position: relative;
        z-index: 1;
      }

      .header-icon {
        width: 3.5rem;
        height: 3.5rem;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
      }

      .header-text h1 {
        font-size: 2.5rem;
        font-weight: 900;
        color: #0f172a;
        margin: 0 0 0.5rem 0;
        letter-spacing: -0.03em;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .header-text p {
        font-size: 1.1rem;
        color: #475569;
        margin: 0;
        font-weight: 600;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
      }

      .form-content {
        max-width: 800px;
        margin: 0 auto;
        padding: 0 2rem 2rem;
      }

      .form-card {
        border-radius: 24px;
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
        border: 1px solid rgba(0, 0, 0, 0.06);
        overflow: hidden;
        position: relative;
        background: white;
      }

      .form-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
      }

      .customer-form {
        padding: 2.5rem;
        position: relative;
        z-index: 1;
      }

      .form-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
        margin-bottom: 1.5rem;
      }

      .form-grid .full-width {
        grid-column: 1 / -1;
      }

      .form-section {
        margin-bottom: 2.5rem;
        padding: 1.5rem;
        background: rgba(248, 250, 252, 0.5);
        border-radius: 16px;
        border: 1px solid rgba(0, 0, 0, 0.06);
      }

      .section-title {
        font-size: 1.25rem;
        font-weight: 700;
        color: #1a202c;
        margin: 0 0 1.5rem 0;
        padding-bottom: 0.75rem;
        border-bottom: 2px solid rgba(102, 126, 234, 0.1);
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }

      .section-title::before {
        content: '';
        width: 4px;
        height: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 2px;
      }

      .full-width {
        width: 100%;
      }

      /* Custom Input Styles - Exact Match with Search Input */
      ::ng-deep .mat-mdc-form-field {
        .mat-mdc-text-field-wrapper {
          background: white;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          transition: all 0.3s ease;
          box-shadow: none;
          height: auto;
          min-height: 48px;
        }

        .mat-mdc-text-field-wrapper:hover {
          border-color: #cbd5e1;
        }

        .mat-mdc-text-field-wrapper.mdc-text-field--focused {
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .mat-mdc-form-field-label {
          color: #475569;
          font-weight: 600;
          font-size: 0.875rem;
          letter-spacing: 0.025em;
          margin-bottom: 0.5rem;
          position: relative;
          z-index: 1;
        }

        .mat-mdc-input-element {
          color: #1a202c;
          font-size: 0.95rem;
          font-weight: 500;
          padding: 0.75rem 1rem;
          height: auto;
          line-height: 1.5;
          border: none;
          background: transparent;
        }

        .mat-mdc-input-element:focus {
          outline: none;
        }

        .mat-mdc-input-element::placeholder {
          color: #94a3b8;
          font-weight: 400;
        }

        .mat-mdc-form-field-error {
          color: #ef4444;
          font-size: 0.875rem;
          font-weight: 500;
          margin-top: 0.5rem;
        }

        .mat-mdc-form-field-hint {
          color: #64748b;
          font-size: 0.875rem;
        }

        .mat-mdc-select {
          .mat-mdc-select-trigger {
            padding: 0.75rem 1rem;
            font-size: 0.95rem;
            color: #1a202c;
            font-weight: 500;
            height: auto;
            min-height: 48px;
            display: flex;
            align-items: center;
            border: none;
            background: transparent;
          }
        }

        .mat-mdc-textarea {
          .mat-mdc-input-element {
            min-height: 80px;
            resize: vertical;
            padding: 0.75rem 1rem;
          }
        }

        /* Icon styling to match search - positioned correctly */
        .mat-mdc-form-field-icon-suffix {
          color: #64748b;
          font-size: 1rem;
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          z-index: 1;
        }

        /* Ensure proper spacing for icons */
        .mat-mdc-form-field-icon-suffix ~ .mat-mdc-input-element {
          padding-right: 3rem;
        }
      }

      /* Additional styles for proper icon positioning */
      ::ng-deep .mat-mdc-form-field {
        position: relative;
        
        .mat-mdc-text-field-wrapper {
          position: relative;
        }
        
        /* Ensure icons don't overlap with text */
        .mat-mdc-form-field-icon-suffix {
          pointer-events: none;
        }
        
        /* Adjust input padding when icon is present */
        .mat-mdc-form-field-icon-suffix + .mat-mdc-input-element,
        .mat-mdc-form-field-icon-suffix ~ .mat-mdc-input-element {
          padding-right: 2.5rem !important;
        }
        
        /* Select trigger with icon */
        .mat-mdc-select-trigger {
          padding-right: 2.5rem !important;
        }
      }

      /* Clean and optimized styles */

      .form-actions {
        display: flex;
        gap: 1.5rem;
        justify-content: flex-end;
        padding-top: 2rem;
        border-top: 1px solid rgba(0, 0, 0, 0.08);
        margin-top: 1rem;
      }

      .cancel-button {
        color: #64748b;
        border-color: #e2e8f0;
        background: white;
        transition: all 0.3s ease;
      }

      .cancel-button:hover {
        background: rgba(100, 116, 139, 0.08);
        border-color: #cbd5e1;
        transform: translateY(-1px);
      }

      .submit-button {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        min-width: 180px;
        height: 52px;
        border-radius: 14px;
        font-weight: 700;
        font-size: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.2);
        position: relative;
        overflow: hidden;
      }

      .submit-button::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        transition: left 0.5s;
      }

      .submit-button:hover::before {
        left: 100%;
      }

      .submit-button:hover:not(:disabled) {
        transform: translateY(-3px);
        box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
      }

      .submit-button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      /* Responsive Design */
      @media (max-width: 768px) {
        .form-header {
          padding: 2rem 0;
        }

        .header-content {
          flex-direction: column;
          text-align: center;
          gap: 1.5rem;
          padding: 0 1rem;
        }

        .header-text h1 {
          font-size: 2rem;
        }

        .form-content {
          padding: 0 1rem 2rem;
        }

        .customer-form {
          padding: 2rem;
        }

        .form-actions {
          flex-direction: column;
          gap: 1rem;
        }

        .submit-button,
        .cancel-button {
          width: 100%;
          height: 48px;
        }
      }

      @media (max-width: 480px) {
        .customer-form {
          padding: 1.5rem;
        }

        .form-grid {
          grid-template-columns: 1fr;
          gap: 1rem;
        }

        .header-text h1 {
          font-size: 1.75rem;
        }
      }

      /* Responsive grid adjustments */
      @media (max-width: 768px) {
        .form-grid {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class CustomerFormComponent implements OnInit {
  customerForm!: FormGroup;
  isEditMode = signal(false);
  isLoading = signal(false);
  customerId: string | null = null;

  // Using inject() function for dependency injection
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private customerService = inject(CustomerService);
  private snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.initializeForm();
    this.checkEditMode();
  }

  private initializeForm(): void {
    this.customerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[\+]?[1-9][\d]{0,15}$/)]],
      company: [''],
      position: [''],
      address: [''],
      city: [''],
      country: [''],
      website: ['', [Validators.pattern(/^https?:\/\/.+/i)]],
      notes: [''],
      status: ['active', Validators.required],
    });
  }

  private checkEditMode(): void {
    this.customerId = this.route.snapshot.paramMap.get('id');
    if (this.customerId) {
      this.isEditMode.set(true);
      this.loadCustomer();
    }
  }

  private loadCustomer(): void {
    if (this.customerId) {
      this.isLoading.set(true);
      this.customerService.getCustomerById(this.customerId).subscribe({
        next: (customer) => {
          this.customerForm.patchValue({
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
            company: customer.company || '',
            position: customer.position || '',
            address: customer.address || '',
            city: customer.city || '',
            country: customer.country || '',
            website: customer.website || '',
            notes: customer.notes || '',
            status: customer.status || 'active',
          });
          this.isLoading.set(false);
        },
        error: (error) => {
          console.warn('Customer not found, redirecting to new customer form:', error);
          this.snackBar.open('Customer not found, creating new customer', 'Close', { duration: 2000 });
          this.router.navigate(['/customers/new']);
          this.isLoading.set(false);
        },
      });
    }
  }

  onSubmit(): void {
    if (this.customerForm.valid) {
      this.isLoading.set(true);
      const customerData = this.customerForm.value;

      if (this.isEditMode()) {
        this.updateCustomer(customerData);
      } else {
        this.createCustomer(customerData);
      }
    } else {
      this.markFormGroupTouched();
      this.snackBar.open('Please fill in all required fields correctly', 'Close', { duration: 3000 });
    }
  }

  private createCustomer(customerData: any): void {
    this.customerService.createCustomer(customerData).subscribe({
      next: (newCustomer: any) => {
        this.snackBar.open('Customer created successfully!', 'Close', { duration: 3000 });
        this.router.navigate(['/customers']);
        this.isLoading.set(false);
      },
      error: (error: any) => {
        console.error('Error creating customer:', error);
        this.snackBar.open('Error creating customer', 'Close', { duration: 3000 });
        this.isLoading.set(false);
      },
    });
  }

  private updateCustomer(customerData: any): void {
    if (this.customerId) {
      this.customerService.updateCustomer(customerData).subscribe({
        next: (updatedCustomer: any) => {
          this.snackBar.open('Customer updated successfully!', 'Close', { duration: 3000 });
          this.router.navigate(['/customers']);
          this.isLoading.set(false);
        },
        error: (error: any) => {
          console.error('Error updating customer:', error);
          this.snackBar.open('Error updating customer', 'Close', { duration: 3000 });
          this.isLoading.set(false);
        },
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/customers']);
  }

  private markFormGroupTouched(): void {
    Object.keys(this.customerForm.controls).forEach((key) => {
      this.customerForm.get(key)?.markAsTouched();
    });
  }
}