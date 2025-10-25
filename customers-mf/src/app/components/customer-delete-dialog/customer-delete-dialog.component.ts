import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { inject } from '@angular/core';

import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-customer-delete-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div class="delete-dialog">
      <!-- Header con icono y título -->
      <div class="dialog-header">
        <div class="warning-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.29 3.86L1.82 18C1.63 18.32 1.54 18.66 1.54 19C1.54 19.77 2.23 20.46 3 20.46H21C21.77 20.46 22.46 19.77 22.46 19C22.46 18.66 22.37 18.32 22.18 18L13.71 3.86C13.52 3.54 13.28 3.28 13 3.14C12.72 3 12.40 3 12 3C11.60 3 11.28 3 11 3.14C10.72 3.28 10.48 3.54 10.29 3.86ZM12 17C11.45 17 11 16.55 11 16V12C11 11.45 11.45 11 12 11C12.55 11 13 11.45 13 12V16C13 16.55 12.55 17 12 17ZM12 9C11.45 9 11 8.55 11 8V7C11 6.45 11.45 6 12 6C12.55 6 13 6.45 13 7V8C13 8.55 12.55 9 12 9Z" fill="currentColor"/>
          </svg>
        </div>
        <div class="header-content">
          <h2 class="dialog-title">Delete Customer</h2>
          <p class="dialog-subtitle">This action cannot be undone</p>
        </div>
      </div>

      <!-- Contenido principal -->
      <div class="dialog-content">
        <!-- Información del cliente -->
        <div class="customer-info-card">
          <div class="customer-avatar">
            <span class="avatar-text">{{ getInitials(data.name) }}</span>
          </div>
          <div class="customer-details">
            <h3 class="customer-name">{{ data.name }}</h3>
            <div class="contact-info">
              <div class="contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M22 6L12 13L2 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>{{ data.email }}</span>
              </div>
              <div class="contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.18999 12.85C3.49997 10.2412 2.44824 7.27099 2.11999 4.18C2.095 3.90347 2.12787 3.62476 2.21649 3.36162C2.30512 3.09849 2.44756 2.85669 2.63476 2.65162C2.82196 2.44655 3.0498 2.28271 3.30379 2.17052C3.55777 2.05833 3.83233 2.00026 4.10999 2H7.10999C7.59531 1.99522 8.06679 2.16708 8.43376 2.48353C8.80073 2.79999 9.03996 3.23945 9.10999 3.72C9.23662 4.68007 9.47144 5.62273 9.80999 6.53C9.94454 6.88792 9.97366 7.27691 9.8939 7.65088C9.81415 8.02485 9.62886 8.36811 9.35999 8.64L8.08999 9.91C9.51355 12.4135 11.5865 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9751 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0555 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>{{ data.phone }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Mensaje de advertencia -->
        <div class="warning-message">
          <div class="warning-icon-small">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="warning-text">
            <p>Are you sure you want to delete <strong>{{ data.name }}</strong>?</p>
            <p>This will permanently remove all customer data and cannot be recovered.</p>
          </div>
        </div>
      </div>

      <!-- Botones de acción -->
      <div class="dialog-actions">
        <button mat-button (click)="onCancel()" class="cancel-button">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Cancel
        </button>
        <button mat-raised-button color="warn" (click)="onConfirm()" class="delete-button">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M10 11v6M14 11v6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Delete Customer
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .delete-dialog {
        padding: 0;
        max-width: 520px;
        margin: 0 auto;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        background: white;
        border-radius: 16px;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        overflow: hidden;
      }

      .dialog-header {
        background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
        padding: 2rem;
        text-align: center;
        border-bottom: 1px solid #fecaca;
        position: relative;
      }

      .warning-icon {
        width: 80px;
        height: 80px;
        background: #dc2626;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 1.5rem;
        color: white;
        box-shadow: 0 8px 25px rgba(220, 38, 38, 0.3);
        animation: pulse-warning 2s infinite;
      }

      @keyframes pulse-warning {
        0%, 100% {
          box-shadow: 0 8px 25px rgba(220, 38, 38, 0.3);
        }
        50% {
          box-shadow: 0 8px 25px rgba(220, 38, 38, 0.5);
        }
      }

      .header-content {
        text-align: center;
      }

      .dialog-title {
        font-size: 1.5rem;
        font-weight: 700;
        color: #1a202c;
        margin: 0 0 0.5rem 0;
      }

      .dialog-subtitle {
        font-size: 0.95rem;
        color: #64748b;
        margin: 0;
        font-weight: 500;
      }

      .dialog-content {
        padding: 2rem;
      }

      .customer-info-card {
        display: flex;
        align-items: center;
        gap: 1.25rem;
        padding: 1.5rem;
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        margin-bottom: 1.5rem;
        transition: all 0.2s ease;
      }

      .customer-info-card:hover {
        background: #f1f5f9;
        border-color: #cbd5e1;
      }

      .customer-avatar {
        width: 60px;
        height: 60px;
        border-radius: 16px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
      }

      .avatar-text {
        color: white;
        font-weight: 700;
        font-size: 1.2rem;
        letter-spacing: 0.5px;
      }

      .customer-details {
        flex: 1;
      }

      .customer-name {
        font-size: 1.25rem;
        font-weight: 700;
        color: #1a202c;
        margin: 0 0 0.25rem 0;
      }

      .contact-info {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      .contact-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        color: #6b7280;
        font-size: 0.875rem;
        font-weight: 500;
      }

      .contact-item svg {
        color: #9ca3af;
        flex-shrink: 0;
      }

      .warning-message {
        background: #fef2f2;
        border: 1px solid #fecaca;
        border-radius: 12px;
        padding: 1.25rem;
        display: flex;
        align-items: flex-start;
        gap: 1rem;
      }

      .warning-icon-small {
        width: 24px;
        height: 24px;
        background: #dc2626;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        flex-shrink: 0;
        margin-top: 0.125rem;
      }

      .warning-text {
        flex: 1;
      }

      .warning-text p {
        margin: 0 0 0.5rem 0;
        font-size: 0.875rem;
        line-height: 1.5;
        color: #991b1b;
        font-weight: 500;
      }

      .warning-text p:last-child {
        margin-bottom: 0;
        font-weight: 400;
        color: #7f1d1d;
      }

      .warning-text strong {
        font-weight: 700;
        color: #991b1b;
      }

      .dialog-actions {
        display: flex;
        gap: 1rem;
        justify-content: flex-end;
        padding: 1rem 2rem 2rem;
        border-top: 1px solid rgba(0, 0, 0, 0.06);
      }

      .cancel-button {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1.5rem;
        border-radius: 10px;
        border: 1px solid #d1d5db;
        background: white;
        color: #6b7280;
        font-weight: 600;
        font-size: 0.875rem;
        transition: all 0.2s ease;
        cursor: pointer;
      }

      .cancel-button:hover {
        background: #f9fafb;
        border-color: #9ca3af;
        color: #4b5563;
      }

      .delete-button {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1.5rem;
        border-radius: 10px;
        background: #dc2626;
        color: white;
        border: none;
        font-weight: 600;
        font-size: 0.875rem;
        transition: all 0.2s ease;
        cursor: pointer;
        box-shadow: 0 2px 4px rgba(220, 38, 38, 0.2);
      }

      .delete-button:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
      }

      /* Responsive Design */
      @media (max-width: 640px) {
        .delete-dialog {
          margin: 1rem;
          max-width: calc(100vw - 2rem);
        }

        .dialog-header {
          padding: 1.5rem;
        }

        .dialog-content {
          padding: 1.5rem;
        }

        .customer-info-card {
          flex-direction: column;
          text-align: center;
          gap: 1rem;
        }

        .dialog-actions {
          flex-direction: column;
          padding: 1.5rem;
        }

        .cancel-button,
        .delete-button {
          width: 100%;
          justify-content: center;
        }
      }
    `,
  ],
})
export class CustomerDeleteDialogComponent {
  dialogRef = inject(MatDialogRef<CustomerDeleteDialogComponent>);
  data = inject<Customer>(MAT_DIALOG_DATA);

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map((word) => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
}