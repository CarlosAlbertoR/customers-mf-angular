import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-customer-delete-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <h2 mat-dialog-title>Delete Customer</h2>

    <mat-dialog-content>
      <div class="delete-dialog-content">
        <mat-icon color="warn" class="warning-icon">warning</mat-icon>
        <p>
          Are you sure you want to delete <strong>{{ data.name }}</strong
          >?
        </p>
        <p class="warning-text">This action cannot be undone.</p>
      </div>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-button color="warn" (click)="onConfirm()">
        <mat-icon>delete</mat-icon>
        Delete
      </button>
    </mat-dialog-actions>
  `,
  styles: [
    `
      .delete-dialog-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 16px;
        padding: 16px 0;
      }

      .warning-icon {
        font-size: 48px;
        width: 48px;
        height: 48px;
      }

      .warning-text {
        color: #f44336;
        font-weight: 500;
      }

      mat-dialog-actions {
        gap: 8px;
      }
    `,
  ],
})
export class CustomerDeleteDialogComponent {
  public dialogRef: MatDialogRef<CustomerDeleteDialogComponent>;
  public data: Customer;

  constructor() {
    this.dialogRef = inject(MatDialogRef<CustomerDeleteDialogComponent>);
    this.data = inject(MAT_DIALOG_DATA) as Customer;
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
