import { Component, inject, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import type { Customer } from '../../models/customer.model';
import { CustomerDeleteDialogComponent } from '../customer-delete-dialog/customer-delete-dialog.component';

@Component({
  selector: 'app-customer-card',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  inputs: ['customer'],
  outputs: ['edit', 'view', 'delete'],
  template: `
    <div class="customer-card-pro">
      <div class="card-header">
        <div class="customer-avatar-pro">
          <span class="avatar-text">{{ getInitials(customer.name) }}</span>
          <div class="avatar-status" [class]="getStatusClass(customer.status)"></div>
        </div>

        <div class="card-actions">
          <button class="card-action-btn favorite" (click)="toggleFavorite()" [class.favorited]="isFavorite">
            @if (isFavorite) {
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
              </svg>
            } @else {
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            }
          </button>
        </div>
      </div>

      <div class="card-body">
        <div class="customer-header">
          <h3 class="customer-name-pro">{{ customer.name }}</h3>
          <div class="status-badge" [class]="getStatusBadgeClass(customer.status)">
            <span class="status-dot"></span>
            <span class="status-text">{{ getStatusText(customer.status) }}</span>
          </div>
        </div>

        <div class="contact-info-pro">
          <div class="contact-item-pro">
            <div class="contact-icon-wrapper">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M22 6L12 13L2 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="contact-details">
              <span class="contact-label">Email</span>
              <a href="mailto:{{ customer.email }}" class="contact-value">{{ customer.email }}</a>
            </div>
          </div>

          <div class="contact-item-pro">
            <div class="contact-icon-wrapper">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.18999 12.85C3.49997 10.2412 2.44824 7.27099 2.11999 4.18C2.095 3.90347 2.12787 3.62476 2.21649 3.36162C2.30512 3.09849 2.44756 2.85669 2.63476 2.65162C2.82196 2.44655 3.0498 2.28271 3.30379 2.17052C3.55777 2.05833 3.83233 2.00026 4.10999 2H7.10999C7.59531 1.99522 8.06679 2.16708 8.43376 2.48353C8.80073 2.79999 9.03996 3.23945 9.10999 3.72C9.23662 4.68007 9.47144 5.62273 9.80999 6.53C9.94454 6.88792 9.97366 7.27691 9.8939 7.65088C9.81415 8.02485 9.62886 8.36811 9.35999 8.64L8.08999 9.91C9.51355 12.4135 11.5865 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9751 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0555 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="contact-details">
              <span class="contact-label">Phone</span>
              <a href="tel:{{ customer.phone }}" class="contact-value">{{ customer.phone }}</a>
            </div>
          </div>
        </div>

        <div class="customer-meta">
          <div class="meta-item">
            <span class="meta-label">Member since</span>
            <span class="meta-value">{{ formatDate(customer.createdAt) }}</span>
          </div>
          @if (customer.company) {
          <div class="meta-item">
            <span class="meta-label">Company</span>
            <span class="meta-value">{{ customer.company }}</span>
          </div>
          }
        </div>
      </div>

      <div class="card-footer">
        <div class="action-buttons">
          <button class="action-button-pro edit" (click)="editCustomer()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Edit</span>
          </button>

          <button class="action-button-pro view" (click)="viewCustomer()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>View</span>
          </button>

          <button class="action-button-pro delete" (click)="deleteCustomer()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M10 11v6M14 11v6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .customer-card-pro {
      background: white;
      border-radius: 20px;
      padding: 1.5rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
      border: 1px solid rgba(0, 0, 0, 0.06);
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }

    .customer-card-pro:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
      border-color: rgba(102, 126, 234, 0.3);
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;
    }

    .customer-avatar-pro {
      position: relative;
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

    .avatar-status {
      position: absolute;
      bottom: -2px;
      right: -2px;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      border: 3px solid white;
    }

    .avatar-status.online {
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

    .card-actions {
      display: flex;
      gap: 0.5rem;
    }

    .card-action-btn {
      width: 32px;
      height: 32px;
      border: none;
      border-radius: 8px;
      background: rgba(0, 0, 0, 0.04);
      color: #64748b;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .card-action-btn:hover {
      background: rgba(102, 126, 234, 0.1);
      color: #667eea;
    }

    .card-action-btn.favorite {
      background: rgba(245, 158, 11, 0.1);
      color: #f59e0b;
      border: 1px solid rgba(245, 158, 11, 0.2);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .card-action-btn.favorite:hover {
      background: rgba(245, 158, 11, 0.2);
      color: #d97706;
      border-color: rgba(245, 158, 11, 0.4);
      transform: scale(1.1);
      box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
    }

    .card-action-btn.favorite.favorited {
      background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
      color: white;
      border-color: #d97706;
      box-shadow: 0 2px 8px rgba(245, 158, 11, 0.4);
    }

    .card-action-btn.favorite.favorited:hover {
      background: linear-gradient(135deg, #d97706 0%, #b45309 100%);
      transform: scale(1.15);
      box-shadow: 0 6px 20px rgba(245, 158, 11, 0.5);
    }

    .card-action-btn.favorite.favorited {
      animation: favorite-pulse 0.6s ease-out;
    }

    @keyframes favorite-pulse {
      0% {
        transform: scale(1);
        box-shadow: 0 2px 8px rgba(245, 158, 11, 0.4);
      }
      50% {
        transform: scale(1.2);
        box-shadow: 0 8px 25px rgba(245, 158, 11, 0.6);
      }
      100% {
        transform: scale(1);
        box-shadow: 0 2px 8px rgba(245, 158, 11, 0.4);
      }
    }

    .card-body {
      margin-bottom: 1.5rem;
    }

    .customer-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;
      gap: 1rem;
    }

    .customer-name-pro {
      font-size: 1.25rem;
      font-weight: 700;
      color: #1a202c;
      margin: 0;
      line-height: 1.3;
      flex: 1;
    }

    .status-badge {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.375rem 0.75rem;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      white-space: nowrap;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .status-badge-active {
      background: rgba(16, 185, 129, 0.3) !important;
      color: #064e3b !important;
      border: 2px solid rgba(16, 185, 129, 0.6) !important;
      font-weight: 800 !important;
    }

    .status-badge-inactive {
      background: rgba(239, 68, 68, 0.3) !important;
      color: #7f1d1d !important;
      border: 2px solid rgba(239, 68, 68, 0.6) !important;
      font-weight: 800 !important;
    }

    .status-badge-pending {
      background: rgba(245, 158, 11, 0.3) !important;
      color: #451a03 !important;
      border: 2px solid rgba(245, 158, 11, 0.6) !important;
      font-weight: 800 !important;
    }

    .status-badge-pending .status-text {
      color: #451a03 !important;
    }

    .status-badge-active .status-text {
      color: #064e3b !important;
    }

    .status-badge-inactive .status-text {
      color: #7f1d1d !important;
    }

    .status-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: currentColor;
    }

    .status-text {
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.3px;
      color: inherit !important;
    }

    .contact-info-pro {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin-bottom: 1rem;
    }

    .contact-item-pro {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .contact-icon-wrapper {
      width: 36px;
      height: 36px;
      border-radius: 10px;
      background: rgba(102, 126, 234, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .contact-details {
      display: flex;
      flex-direction: column;
      gap: 0.125rem;
      flex: 1;
    }

    .contact-label {
      font-size: 0.75rem;
      color: #64748b;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .contact-value {
      font-size: 0.95rem;
      color: #1a202c;
      font-weight: 500;
      text-decoration: none;
      transition: color 0.2s ease;
    }

    .contact-value:hover {
      color: #667eea;
    }

    .customer-meta {
      padding: 0.75rem;
      background: rgba(102, 126, 234, 0.04);
      border-radius: 12px;
      border: 1px solid rgba(102, 126, 234, 0.08);
    }

    .meta-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }

    .meta-item:last-child {
      margin-bottom: 0;
    }

    .meta-label {
      font-size: 0.875rem;
      color: #64748b;
      font-weight: 500;
    }

    .meta-value {
      font-size: 0.875rem;
      color: #1a202c;
      font-weight: 600;
    }

    .card-footer {
      border-top: 1px solid rgba(0, 0, 0, 0.06);
      padding-top: 1rem;
    }

    .action-buttons {
      display: flex;
      gap: 0.5rem;
    }

    .action-button-pro {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.75rem;
      border: none;
      border-radius: 10px;
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .action-button-pro.edit {
      background: rgba(59, 130, 246, 0.1);
      color: #3b82f6;
    }

    .action-button-pro.edit:hover {
      background: rgba(59, 130, 246, 0.2);
      transform: translateY(-1px);
    }

    .action-button-pro.view {
      background: rgba(16, 185, 129, 0.1);
      color: #10b981;
    }

    .action-button-pro.view:hover {
      background: rgba(16, 185, 129, 0.2);
      transform: translateY(-1px);
    }

    .action-button-pro.delete {
      background: rgba(239, 68, 68, 0.1);
      color: #ef4444;
    }

    .action-button-pro.delete:hover {
      background: rgba(239, 68, 68, 0.2);
      transform: translateY(-1px);
    }
  `]
})
export class CustomerCardComponent {
  customer!: Customer;
  edit = new EventEmitter<Customer>();
  view = new EventEmitter<Customer>();
  delete = new EventEmitter<Customer>();

  private dialog = inject(MatDialog);
  private router = inject(Router);

  isFavorite = false;

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

  getStatusBadgeClass(status: string): string {
    return `status-badge-${status.toLowerCase()}`;
  }

  getStatusText(status: string): string {
    switch (status.toLowerCase()) {
      case 'active':
        return 'Active';
      case 'inactive':
        return 'Inactive';
      case 'pending':
        return 'Pending';
      default:
        return status;
    }
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });
  }

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
  }


  editCustomer(): void {
    this.edit.emit(this.customer);
    this.router.navigate(['/customers', this.customer.id, 'edit']);
  }

  viewCustomer(): void {
    this.view.emit(this.customer);
  }

  deleteCustomer(): void {
    this.delete.emit(this.customer);
  }
}
