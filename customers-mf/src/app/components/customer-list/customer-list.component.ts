import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
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
import { CustomerDetailDialogComponent } from '../customer-detail-dialog/customer-detail-dialog.component';
import { CustomerCardComponent } from '../customer-card/customer-card.component';

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
      CustomerCardComponent,
    ],
  template: `
    <div class="customer-management-system">
      <!-- Professional Header with Statistics -->
      <div class="system-header">
        <div class="header-main">
          <div class="brand-section">
            <div class="brand-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" fill="currentColor"/>
                <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" fill="currentColor"/>
                <path d="M20 7C20 8.10457 19.1046 9 18 9C16.8954 9 16 8.10457 16 7C16 5.89543 16.8954 5 18 5C19.1046 5 20 5.89543 20 7Z" fill="currentColor"/>
                <path d="M18 14C15.7909 14 14 15.7909 14 18V21H22V18C22 15.7909 20.2091 14 18 14Z" fill="currentColor"/>
              </svg>
            </div>
            <div class="brand-text">
              <h1 class="system-title">Customer Management System</h1>
              <p class="system-subtitle">Advanced customer relationship management powered by Angular 20+</p>
            </div>
          </div>

          <div class="header-actions">
            <button class="action-button primary" (click)="loadCustomers()">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 4V10H7M23 20V14H17M20.49 9A9 9 0 0 0 5.64 5.64L1 10M23 14L18.36 18.36A9 9 0 0 1 3.51 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>Refresh</span>
            </button>
          </div>
        </div>

        <!-- Key Metrics Dashboard -->
        <div class="metrics-dashboard">
          <div class="metric-card total">
            <div class="metric-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 3V21H21V3H3ZM19 19H5V5H19V19Z" fill="currentColor"/>
                <path d="M7 7H17V9H7V7Z" fill="currentColor"/>
                <path d="M7 11H15V13H7V11Z" fill="currentColor"/>
                <path d="M7 15H13V17H7V15Z" fill="currentColor"/>
              </svg>
            </div>
            <div class="metric-content">
              <div class="metric-value">{{ customers().length }}</div>
              <div class="metric-label">Total Customers</div>
            </div>
          </div>

          <div class="metric-card active">
            <div class="metric-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="metric-content">
              <div class="metric-value">{{ getActiveCustomers() }}</div>
              <div class="metric-label">Active</div>
            </div>
          </div>

          <div class="metric-card recent">
            <div class="metric-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 2V5M16 2V5M3.5 9.09H20.5M5 19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H7C5.89543 5 5 5.89543 5 7V19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="metric-content">
              <div class="metric-value">{{ getRecentCustomers() }}</div>
              <div class="metric-label">This Month</div>
            </div>
          </div>

                 <div class="metric-card growth">
                   <div class="metric-icon">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                     </svg>
                   </div>
                   <div class="metric-content">
                     <div class="metric-value" [class.positive]="getGrowthPercentage().startsWith('+')" [class.negative]="getGrowthPercentage().startsWith('-')">{{ getGrowthPercentage() }}</div>
                     <div class="metric-label">Growth</div>
                   </div>
                 </div>
        </div>
      </div>

      <!-- Content Area -->
      <div class="content-area">
        @if (customerService.loading()) {
        <div class="loading-state">
          <div class="professional-spinner">
            <div class="spinner-ring"></div>
            <div class="spinner-core"></div>
          </div>
          <h3 class="loading-title">Loading Customer Data</h3>
          <p class="loading-subtitle">Fetching the latest customer information...</p>
        </div>
        } @else if (customerService.error()) {
        <div class="error-state">
          <div class="error-visual">
            <div class="error-icon-large">⚠️</div>
            <div class="error-pattern"></div>
          </div>
          <h3 class="error-title">Connection Issue</h3>
          <p class="error-message">{{ customerService.error() }}</p>
          <button class="retry-button" (click)="loadCustomers()">
            <span class="button-icon">🔄</span>
            <span>Retry Connection</span>
          </button>
        </div>
        } @else {
        <div class="customers-section">
          @if (customers().length === 0) {
          <div class="empty-state">
            <div class="empty-visual">
              <div class="empty-icon-large">📋</div>
              <div class="empty-pattern"></div>
            </div>
            <h3 class="empty-title">No Customers Yet</h3>
            <p class="empty-message">Your customer database is ready for new entries</p>
            <button class="get-started-button" (click)="addNewCustomer()">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>Add First Customer</span>
            </button>
          </div>
          } @else {
          <!-- Customer Grid Header -->
          <div class="grid-header">
            <div class="grid-title">
              <h2>Customer Directory</h2>
              <span class="customer-count">
                {{ filteredCustomers().length }} of {{ customers().length }} customers
                @if (statusFilter()) {
                  <span class="filter-indicator">({{ statusFilter() }} status)</span>
                }
              </span>
            </div>

            <div class="grid-controls">
              <div class="search-box">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="search-icon">
                  <path d="M21 21L16.514 16.506M19 10.5A8.5 8.5 0 1 1 10.5 2 8.5 8.5 0 0 1 19 10.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <input 
                  type="text" 
                  placeholder="Search customers..." 
                  class="search-input"
                  [value]="searchQuery()"
                  (input)="onSearchChange($event)"
                />
              </div>

              <div class="status-filter">
                <select class="status-select" [value]="statusFilter()" (change)="onStatusFilterChange($event)">
                  <option value="">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>
          </div>

                 <!-- Professional Customer Grid -->
                 <div class="professional-grid">
                   @for (customer of filteredCustomers(); track customer.id) {
                     <app-customer-card 
                       [customer]="customer"
                       (edit)="editCustomer($event)"
                       (view)="viewCustomer($event)"
                       (delete)="deleteCustomer($event)">
                     </app-customer-card>
                   }
                 </div>
          }
        </div>
        }
      </div>
    </div>
  `,
  styles: [
    `
      /* Customer Management System - Professional UI */
      .customer-management-system {
        width: 100%;
        min-height: 100vh;
        background: transparent;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      }

      /* Professional Header */
      .system-header {
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.95) 100%);
        backdrop-filter: blur(20px);
        border-bottom: 1px solid rgba(0, 0, 0, 0.12);
        padding: 2.5rem 0;
        margin-bottom: 2rem;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        position: relative;
      }

      .system-header::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, rgba(102, 126, 234, 0.02) 0%, rgba(118, 75, 162, 0.02) 100%);
        pointer-events: none;
      }

      .header-main {
        max-width: 1400px;
        margin: 0 auto;
        padding: 0 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
        position: relative;
        z-index: 1;
      }

      .brand-section {
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      .brand-icon {
        width: 3.5rem;
        height: 3.5rem;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
        animation: float 3s ease-in-out infinite;
      }

      @keyframes float {
        0%,
        100% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-3px);
        }
      }

      .brand-text {
        display: flex;
        flex-direction: column;
      }

      .system-title {
        font-size: 2.5rem;
        font-weight: 900;
        color: #0f172a;
        margin: 0;
        letter-spacing: -0.03em;
        line-height: 1.1;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .system-subtitle {
        font-size: 1.1rem;
        color: #475569;
        margin: 0;
        font-weight: 600;
        letter-spacing: 0.01em;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
      }

      .header-actions {
        display: flex;
        gap: 1rem;
      }

      .action-button {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 12px;
        font-weight: 600;
        font-size: 0.95rem;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .action-button.primary {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
      }

      .action-button.primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
      }

      .button-icon {
        font-size: 1rem;
      }

      /* Metrics Dashboard */
      .metrics-dashboard {
        max-width: 1400px;
        margin: 0 auto;
        padding: 0 2rem;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 1.5rem;
        position: relative;
        z-index: 1;
      }

      .metric-card {
        background: white;
        border-radius: 16px;
        padding: 1.5rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        border: 1px solid rgba(0, 0, 0, 0.06);
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
      }

      .metric-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
      }

      .metric-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
      }

      .metric-card.total::before {
        background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
      }
      .metric-card.active::before {
        background: linear-gradient(90deg, #10b981 0%, #047857 100%);
      }
      .metric-card.recent::before {
        background: linear-gradient(90deg, #f59e0b 0%, #d97706 100%);
      }
      .metric-card.growth::before {
        background: linear-gradient(90deg, #8b5cf6 0%, #7c3aed 100%);
      }

      .metric-icon {
        width: 3rem;
        height: 3rem;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        flex-shrink: 0;
      }

      .metric-card.total .metric-icon {
        background: rgba(102, 126, 234, 0.1);
      }
      .metric-card.active .metric-icon {
        background: rgba(16, 185, 129, 0.1);
      }
      .metric-card.recent .metric-icon {
        background: rgba(245, 158, 11, 0.1);
      }
      .metric-card.growth .metric-icon {
        background: rgba(139, 92, 246, 0.1);
      }

      .metric-content {
        flex: 1;
      }

             .metric-value {
               font-size: 2rem;
               font-weight: 800;
               color: #1a202c;
               line-height: 1;
               margin-bottom: 0.25rem;
             }

             .metric-value.positive {
               color: #10b981;
             }

             .metric-value.negative {
               color: #ef4444;
             }

      .metric-label {
        font-size: 0.875rem;
        color: #64748b;
        font-weight: 500;
      }

      /* Content Area */
      .content-area {
        max-width: 1400px;
        margin: 0 auto;
        padding: 0 2rem 2rem;
      }

      /* Loading State */
      .loading-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 4rem 2rem;
        text-align: center;
      }

      .professional-spinner {
        position: relative;
        width: 60px;
        height: 60px;
        margin-bottom: 2rem;
      }

      .spinner-ring {
        position: absolute;
        width: 100%;
        height: 100%;
        border: 3px solid rgba(102, 126, 234, 0.2);
        border-top: 3px solid #667eea;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }

      .spinner-core {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 20px;
        height: 20px;
        background: #667eea;
        border-radius: 50%;
        animation: pulse 1.5s ease-in-out infinite;
      }

      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }

      @keyframes pulse {
        0%,
        100% {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
        50% {
          opacity: 0.5;
          transform: translate(-50%, -50%) scale(0.8);
        }
      }

      .loading-title {
        font-size: 1.5rem;
        font-weight: 600;
        color: #1a202c;
        margin: 0 0 0.5rem 0;
      }

      .loading-subtitle {
        font-size: 1rem;
        color: #64748b;
        margin: 0;
      }

      /* Error State */
      .error-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 4rem 2rem;
        text-align: center;
      }

      .error-visual {
        position: relative;
        margin-bottom: 2rem;
      }

      .error-icon-large {
        font-size: 4rem;
        filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
      }

      .error-title {
        font-size: 1.5rem;
        font-weight: 600;
        color: #1a202c;
        margin: 0 0 0.5rem 0;
      }

      .error-message {
        font-size: 1rem;
        color: #64748b;
        margin: 0 0 2rem 0;
        max-width: 400px;
      }

      .retry-button {
        background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
        color: white;
        border: none;
        border-radius: 12px;
        padding: 0.75rem 1.5rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        box-shadow: 0 2px 4px rgba(239, 68, 68, 0.3);
      }

      .retry-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
      }

      /* Empty State */
      .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 4rem 2rem;
        text-align: center;
      }

      .empty-visual {
        position: relative;
        margin-bottom: 2rem;
      }

      .empty-icon-large {
        font-size: 4rem;
        color: #cbd5e1;
        filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.05));
      }

      .empty-title {
        font-size: 1.5rem;
        font-weight: 600;
        color: #1a202c;
        margin: 0 0 0.5rem 0;
      }

      .empty-message {
        font-size: 1rem;
        color: #64748b;
        margin: 0 0 2rem 0;
        max-width: 400px;
      }

      .get-started-button {
        background: linear-gradient(135deg, #10b981 0%, #047857 100%);
        color: white;
        border: none;
        border-radius: 12px;
        padding: 0.75rem 1.5rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        box-shadow: 0 2px 4px rgba(16, 185, 129, 0.3);
      }

      .get-started-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
      }

      /* Grid Header */
      .grid-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
        flex-wrap: wrap;
        gap: 1rem;
      }

      .grid-title {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }

      .grid-title h2 {
        font-size: 1.5rem;
        font-weight: 700;
        color: #1a202c;
        margin: 0;
      }

             .customer-count {
               font-size: 0.875rem;
               color: #64748b;
               font-weight: 500;
             }

             .filter-indicator {
               color: #667eea;
               font-weight: 600;
               margin-left: 0.5rem;
             }

      .grid-controls {
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      .search-box {
        position: relative;
        display: flex;
        align-items: center;
      }

      .search-icon {
        position: absolute;
        left: 1rem;
        color: #64748b;
        z-index: 1;
      }

      .search-input {
        padding: 0.75rem 1rem 0.75rem 2.5rem;
        border: 2px solid #e2e8f0;
        border-radius: 12px;
        font-size: 0.95rem;
        background: white;
        color: #1a202c;
        transition: all 0.3s ease;
        width: 300px;
      }

             .search-input:focus {
               outline: none;
               border-color: #667eea;
               box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
             }

             .status-filter {
               display: flex;
               align-items: center;
             }

             .status-select {
               padding: 0.75rem 1rem;
               border: 2px solid #e2e8f0;
               border-radius: 12px;
               font-size: 0.95rem;
               background: white;
               color: #1a202c;
               transition: all 0.3s ease;
               cursor: pointer;
               min-width: 140px;
             }

             .status-select:focus {
               outline: none;
               border-color: #667eea;
               box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
             }

             .status-select:hover {
               border-color: #cbd5e1;
             }

      .filter-button,
      .view-toggle {
        width: 40px;
        height: 40px;
        border: 2px solid #e2e8f0;
        border-radius: 12px;
        background: white;
        color: #64748b;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .filter-button:hover,
      .view-toggle:hover {
        border-color: #667eea;
        color: #667eea;
      }

      .view-toggle.active {
        background: #667eea;
        color: white;
        border-color: #667eea;
      }

      /* Professional Customer Grid */
      .professional-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
        gap: 1.5rem;
      }

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

      .card-body {
        margin-bottom: 1.5rem;
      }

      .customer-name-pro {
        font-size: 1.25rem;
        font-weight: 700;
        color: #1a202c;
        margin: 0 0 1rem 0;
        line-height: 1.3;
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

      .contact-icon {
        font-size: 1rem;
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

      /* Responsive Design */
      @media (max-width: 1024px) {
        .header-main {
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 1.5rem;
        }

        .metrics-dashboard {
          grid-template-columns: repeat(2, 1fr);
        }

        .professional-grid {
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        }
      }

      @media (max-width: 768px) {
        .system-header {
          padding: 1.5rem 0;
        }

        .header-main {
          padding: 0 1rem;
        }

        .metrics-dashboard {
          grid-template-columns: 1fr;
          padding: 0 1rem;
        }

        .content-area {
          padding: 0 1rem 2rem;
        }

        .grid-header {
          flex-direction: column;
          align-items: stretch;
        }

        .grid-controls {
          justify-content: center;
        }

        .search-input {
          width: 100%;
          max-width: 300px;
        }

        .professional-grid {
          grid-template-columns: 1fr;
        }

        .brand-section {
          flex-direction: column;
          text-align: center;
          gap: 0.75rem;
        }

        .system-title {
          font-size: 1.5rem;
        }
      }

      @media (max-width: 480px) {
        .customer-card-pro {
          padding: 1rem;
        }

        .action-buttons {
          flex-direction: column;
        }

        .action-button-pro {
          justify-content: center;
        }
      }
    `,
  ],
})
export class CustomerListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'phone', 'actions'];

  // Using inject() function for dependency injection (modern Angular approach)
  customerService = inject(CustomerService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  // Search and filter functionality
  searchQuery = signal('');
  statusFilter = signal('');
  
  filteredCustomers = computed(() => {
    let filtered = this.customers();
    
    // Apply search filter
    const query = this.searchQuery().toLowerCase();
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
    
    // Apply status filter
    const status = this.statusFilter();
    if (status) {
      filtered = filtered.filter(customer => customer.status === status);
    }
    
    return filtered;
  });

  // Computed signal for customers
  customers = computed(() => this.customerService.customers());

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.loadCustomers();
  }

  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchQuery.set(target.value);
  }

  onStatusFilterChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.statusFilter.set(target.value);
  }

  addNewCustomer(): void {
    this.router.navigate(['/customers/new']);
  }


  editCustomer(customer: Customer): void {
    this.router.navigate(['/customers', customer.id, 'edit']);
  }

  viewCustomer(customer: Customer): void {
    const dialogRef = this.dialog.open(CustomerDetailDialogComponent, {
      data: customer,
      width: '600px',
      maxWidth: '90vw',
      disableClose: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'edit') {
        this.editCustomer(customer);
      }
    });
  }

  deleteCustomer(customer: Customer): void {
    const dialogRef = this.dialog.open(CustomerDeleteDialogComponent, {
      data: customer,
      width: '500px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.customerService.deleteCustomer(customer.id).subscribe({
          next: () => {
            this.snackBar.open('Customer deleted successfully', 'Close', { duration: 3000 });
            console.log('Customer deleted successfully');
          },
          error: (error) => {
            console.error('Error deleting customer:', error);
            this.snackBar.open('Error deleting customer', 'Close', { duration: 3000 });
          },
        });
      }
    });
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map((word) => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  getActiveCustomers(): number {
    return this.customers().filter(c => c.status === 'active').length;
  }

  getRecentCustomers(): number {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    return this.customers().filter((customer) => {
      const createdDate = new Date(customer.createdAt);
      return createdDate > oneMonthAgo;
    }).length;
  }

  getGrowthPercentage(): string {
    const currentMonth = new Date();
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    
    const currentMonthCustomers = this.customers().filter(c => {
      const createdDate = new Date(c.createdAt);
      return createdDate.getMonth() === currentMonth.getMonth() && 
             createdDate.getFullYear() === currentMonth.getFullYear();
    }).length;
    
    const lastMonthCustomers = this.customers().filter(c => {
      const createdDate = new Date(c.createdAt);
      return createdDate.getMonth() === lastMonth.getMonth() && 
             createdDate.getFullYear() === lastMonth.getFullYear();
    }).length;
    
    if (lastMonthCustomers === 0) {
      return currentMonthCustomers > 0 ? '+100%' : '0%';
    }
    
    const growth = ((currentMonthCustomers - lastMonthCustomers) / lastMonthCustomers) * 100;
    return growth >= 0 ? `+${Math.round(growth)}%` : `${Math.round(growth)}%`;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });
  }
}
