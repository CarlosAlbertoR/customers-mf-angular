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
      <div class="dialog-header">
        <div class="warning-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h2 class="dialog-title">Delete Customer</h2>
        <p class="dialog-subtitle">This action cannot be undone</p>
      </div>

      <div class="dialog-content">
        <div class="customer-info">
          <div class="customer-avatar">
            <span class="avatar-text">{{ getInitials(data.name) }}</span>
          </div>
          <div class="customer-details">
            <h3 class="customer-name">{{ data.name }}</h3>
            <p class="customer-email">{{ data.email }}</p>
            <p class="customer-phone">{{ data.phone }}</p>
          </div>
        </div>

        <div class="warning-message">
          <p>Are you sure you want to delete <strong>{{ data.name }}</strong>? This will permanently remove all customer data and cannot be recovered.</p>
        </div>
      </div>

      <div class="dialog-actions">
        <button mat-button (click)="onCancel()" class="cancel-button">
          <mat-icon>close</mat-icon>
          Cancel
        </button>
        <button mat-raised-button color="warn" (click)="onConfirm()" class="delete-button">
          <mat-icon>delete</mat-icon>
          Delete Customer
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .delete-dialog {
        padding: 0;
        max-width: 500px;
        width: 100%;
      }

      .dialog-header {
        text-align: center;
        padding: 2rem 2rem 1rem;
        border-bottom: 1px solid rgba(0, 0, 0, 0.06);
      }

      .warning-icon {
        width: 80px;
        height: 80px;
        background: rgba(239, 68, 68, 0.1);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 1.5rem;
        color: #ef4444;
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

      .customer-info {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1.5rem;
        background: rgba(102, 126, 234, 0.04);
        border-radius: 12px;
        border: 1px solid rgba(102, 126, 234, 0.08);
        margin-bottom: 1.5rem;
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

      .customer-email,
      .customer-phone {
        font-size: 0.95rem;
        color: #64748b;
        margin: 0 0 0.125rem 0;
        font-weight: 500;
      }

      .warning-message {
        background: rgba(239, 68, 68, 0.05);
        border: 1px solid rgba(239, 68, 68, 0.1);
        border-radius: 12px;
        padding: 1rem;
      }

      .warning-message p {
        margin: 0;
        color: #374151;
        font-size: 0.95rem;
        line-height: 1.5;
      }

      .dialog-actions {
        display: flex;
        gap: 1rem;
        justify-content: flex-end;
        padding: 1rem 2rem 2rem;
        border-top: 1px solid rgba(0, 0, 0, 0.06);
      }

      .cancel-button {
        color: #64748b;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        padding: 0.75rem 1.5rem;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        transition: all 0.2s ease;
      }

      .cancel-button:hover {
        background: rgba(100, 116, 139, 0.1);
        border-color: #cbd5e1;
      }

      .delete-button {
        background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
        color: white;
        border: none;
        border-radius: 8px;
        padding: 0.75rem 1.5rem;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        transition: all 0.2s ease;
        box-shadow: 0 2px 4px rgba(239, 68, 68, 0.3);
      }

      .delete-button:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
      }

      /* Responsive Design */
      @media (max-width: 480px) {
        .dialog-header {
          padding: 1.5rem 1rem 1rem;
        }

        .dialog-content {
          padding: 1.5rem 1rem;
        }

        .customer-info {
          flex-direction: column;
          text-align: center;
        }

        .dialog-actions {
          flex-direction: column;
          padding: 1rem;
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