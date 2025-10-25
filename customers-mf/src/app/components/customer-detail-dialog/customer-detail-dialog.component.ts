import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-customer-detail-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule, MatDividerModule],
  template: `
    <div class="customer-detail-dialog">
      <div class="dialog-header">
        <div class="header-content">
          <div class="customer-avatar-large">
            <span class="avatar-text">{{ getInitials(data.name) }}</span>
            <div class="avatar-status" [class]="getStatusClass(data.status)"></div>
          </div>
          <div class="header-info">
            <h2 class="customer-name">{{ data.name }}</h2>
            <p class="customer-title">{{ data.position || 'Customer' }}</p>
            <div class="status-badge" [class]="getStatusClass(data.status)">
              {{ getStatusText(data.status) }}
            </div>
          </div>
        </div>
        <button mat-icon-button (click)="onClose()" class="close-button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <div class="dialog-content">
        <!-- Contact Information -->
        <div class="info-section">
          <h3 class="section-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 21V19C20 17.134 16.866 14 13 14H11C7.134 14 4 17.134 4 21V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Contact Information
          </h3>
          <div class="info-grid">
            <div class="info-item">
              <div class="info-label">Email</div>
              <div class="info-value">
                <a href="mailto:{{ data.email }}" class="contact-link">{{ data.email }}</a>
              </div>
            </div>
            <div class="info-item">
              <div class="info-label">Phone</div>
              <div class="info-value">
                <a href="tel:{{ data.phone }}" class="contact-link">{{ data.phone }}</a>
              </div>
            </div>
          </div>
        </div>

        <!-- Professional Information -->
        @if (data.company || data.position || data.website) {
        <div class="info-section">
          <h3 class="section-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 21H21M5 21V8L12 3L19 8V21M9 9V17M15 9V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Professional Information
          </h3>
          <div class="info-grid">
            @if (data.company) {
            <div class="info-item">
              <div class="info-label">Company</div>
              <div class="info-value">{{ data.company }}</div>
            </div>
            }
            @if (data.position) {
            <div class="info-item">
              <div class="info-label">Position</div>
              <div class="info-value">{{ data.position }}</div>
            </div>
            }
            @if (data.website) {
            <div class="info-item">
              <div class="info-label">Website</div>
              <div class="info-value">
                <a href="{{ data.website }}" target="_blank" class="contact-link">{{ data.website }}</a>
              </div>
            </div>
            }
          </div>
        </div>
        }

        <!-- Address Information -->
        @if (data.address || data.city || data.country) {
        <div class="info-section">
          <h3 class="section-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 10C21 17 12 23 12 23S3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.3639 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Address Information
          </h3>
          <div class="info-grid">
            @if (data.address) {
            <div class="info-item">
              <div class="info-label">Address</div>
              <div class="info-value">{{ data.address }}</div>
            </div>
            }
            @if (data.city) {
            <div class="info-item">
              <div class="info-label">City</div>
              <div class="info-value">{{ data.city }}</div>
            </div>
            }
            @if (data.country) {
            <div class="info-item">
              <div class="info-label">Country</div>
              <div class="info-value">{{ data.country }}</div>
            </div>
            }
          </div>
        </div>
        }

        <!-- Additional Information -->
        @if (data.notes) {
        <div class="info-section">
          <h3 class="section-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M14 2V8H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Additional Information
          </h3>
          <div class="notes-content">
            <p>{{ data.notes }}</p>
          </div>
        </div>
        }

        <!-- Account Information -->
        <div class="info-section">
          <h3 class="section-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 2V5M16 2V5M3.5 9.09H20.5M5 19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H7C5.89543 5 5 5.89543 5 7V19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Account Information
          </h3>
          <div class="info-grid">
            <div class="info-item">
              <div class="info-label">Member Since</div>
              <div class="info-value">{{ formatDate(data.createdAt) }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Last Updated</div>
              <div class="info-value">{{ formatDate(data.updatedAt) }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="dialog-actions">
        <button mat-stroked-button (click)="onClose()" class="cancel-button">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Close
        </button>
        <button mat-raised-button color="primary" (click)="onEdit()" class="edit-button">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Edit Customer
        </button>
      </div>
    </div>
  `,
  styles: [`
    .customer-detail-dialog {
      padding: 0;
      background: white;
      border-radius: 16px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
      font-family: 'Inter', sans-serif;
      max-width: 600px;
      width: 100%;
      max-height: 80vh;
      overflow-y: auto;
    }

    .dialog-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 2rem;
      border-radius: 16px 16px 0 0;
      position: relative;
    }

    .header-content {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }

    .customer-avatar-large {
      position: relative;
      width: 80px;
      height: 80px;
      border-radius: 20px;
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(10px);
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid rgba(255, 255, 255, 0.3);
    }

    .avatar-text {
      color: white;
      font-weight: 700;
      font-size: 1.5rem;
      letter-spacing: 0.5px;
    }

    .avatar-status {
      position: absolute;
      bottom: -2px;
      right: -2px;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: 3px solid white;
    }

    .avatar-status.active {
      background: #10b981;
      box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.3);
    }

    .avatar-status.pending {
      background: #f59e0b;
      box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.3);
    }

    .avatar-status.inactive {
      background: #ef4444;
      box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.3);
    }

    .header-info {
      flex: 1;
    }

    .customer-name {
      font-size: 1.75rem;
      font-weight: 800;
      margin: 0 0 0.5rem 0;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .customer-title {
      font-size: 1.1rem;
      margin: 0 0 1rem 0;
      opacity: 0.9;
    }

    .status-badge {
      display: inline-block;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.875rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .status-badge.active {
      background: rgba(16, 185, 129, 0.2);
      color: #10b981;
    }

    .status-badge.pending {
      background: rgba(245, 158, 11, 0.2);
      color: #f59e0b;
    }

    .status-badge.inactive {
      background: rgba(239, 68, 68, 0.2);
      color: #ef4444;
    }

    .close-button {
      position: absolute;
      top: 1rem;
      right: 1rem;
      color: white;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
    }

    .close-button:hover {
      background: rgba(255, 255, 255, 0.2);
    }

    .dialog-content {
      padding: 2rem;
    }

    .info-section {
      margin-bottom: 2rem;
    }

    .info-section:last-child {
      margin-bottom: 0;
    }

    .section-title {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 1.1rem;
      font-weight: 700;
      color: #1a202c;
      margin: 0 0 1rem 0;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid rgba(102, 126, 234, 0.1);
    }

    .info-grid {
      display: grid;
      gap: 1rem;
    }

    .info-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem;
      background: rgba(248, 250, 252, 0.5);
      border-radius: 12px;
      border: 1px solid rgba(0, 0, 0, 0.06);
    }

    .info-label {
      font-size: 0.875rem;
      color: #64748b;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .info-value {
      font-size: 0.95rem;
      color: #1a202c;
      font-weight: 500;
    }

    .contact-link {
      color: #667eea;
      text-decoration: none;
      transition: color 0.2s ease;
    }

    .contact-link:hover {
      color: #5a67d8;
    }

    .notes-content {
      padding: 1rem;
      background: rgba(102, 126, 234, 0.04);
      border-radius: 12px;
      border: 1px solid rgba(102, 126, 234, 0.08);
    }

    .notes-content p {
      margin: 0;
      color: #4a5568;
      line-height: 1.6;
    }

    .dialog-actions {
      display: flex;
      gap: 1rem;
      justify-content: flex-end;
      padding: 1.5rem 2rem;
      border-top: 1px solid rgba(0, 0, 0, 0.06);
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
    }

    .edit-button {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      min-width: 160px;
      height: 48px;
      border-radius: 12px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.2);
    }

    .edit-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
    }

    @media (max-width: 768px) {
      .customer-detail-dialog {
        max-width: 95vw;
        margin: 1rem;
      }

      .dialog-header {
        padding: 1.5rem;
      }

      .header-content {
        flex-direction: column;
        text-align: center;
        gap: 1rem;
      }

      .dialog-content {
        padding: 1.5rem;
      }

      .dialog-actions {
        flex-direction: column;
        padding: 1rem 1.5rem;
      }

      .edit-button,
      .cancel-button {
        width: 100%;
      }
    }
  `]
})
export class CustomerDetailDialogComponent {
  dialogRef = inject(MatDialogRef<CustomerDetailDialogComponent>);
  data = inject<Customer>(MAT_DIALOG_DATA);

  getInitials(name: string): string {
    return name
      .split(' ')
      .map((word) => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  getStatusClass(status: string): string {
    return status.toLowerCase();
  }

  getStatusText(status: string): string {
    return status.charAt(0).toUpperCase() + status.slice(1);
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onEdit(): void {
    this.dialogRef.close('edit');
  }
}
