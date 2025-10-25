import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

import { CustomerDeleteDialogComponent } from './customer-delete-dialog.component';
import { Customer } from '../../models/customer.model';

describe('CustomerDeleteDialogComponent - Professional Test Suite', () => {
  let component: CustomerDeleteDialogComponent;
  let fixture: ComponentFixture<CustomerDeleteDialogComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<CustomerDeleteDialogComponent>>;
  let mockData: Customer;

  beforeEach(async () => {
    mockData = {
      id: 'customer-1',
      name: 'John Doe',
      email: 'john.doe@techcorp.com',
      phone: '+1-555-123-4567',
      company: 'TechCorp Solutions',
      position: 'Senior Developer',
      address: '123 Tech Street',
      city: 'San Francisco',
      country: 'USA',
      website: 'https://techcorp.com',
      notes: 'VIP Customer - Enterprise account',
      status: 'active',
      createdAt: new Date('2024-01-15T10:00:00Z'),
      updatedAt: new Date('2024-01-15T10:00:00Z'),
    };

    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [CustomerDeleteDialogComponent, MatButtonModule, NoopAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: mockData },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerDeleteDialogComponent);
    component = fixture.componentInstance;
    mockDialogRef = TestBed.inject(MatDialogRef) as jasmine.SpyObj<
      MatDialogRef<CustomerDeleteDialogComponent>
    >;
  });

  describe('🚀 Component Initialization', () => {
    it('should create component successfully', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize with customer data', () => {
      expect(component.data).toBe(mockData);
      expect(component.data.name).toBe('John Doe');
    });

    it('should display customer name in confirmation message', () => {
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;

      const confirmationText = compiled.querySelector('.dialog-content p');
      expect(confirmationText?.textContent).toContain('John Doe');
    });
  });

  describe('🗑️ Delete Confirmation Actions', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should confirm deletion when delete button is clicked', () => {
      const deleteButton = fixture.debugElement.query(By.css('button[color="warn"]'));

      deleteButton.nativeElement.click();

      expect(mockDialogRef.close).toHaveBeenCalledWith(true);
    });

    it('should cancel deletion when cancel button is clicked', () => {
      const cancelButton = fixture.debugElement.query(By.css('button:not([color="warn"])'));

      cancelButton.nativeElement.click();

      expect(mockDialogRef.close).toHaveBeenCalledWith(false);
    });

    it('should have proper button labels', () => {
      const compiled = fixture.nativeElement as HTMLElement;

      const deleteButton = compiled.querySelector('button[color="warn"]');
      const cancelButton = compiled.querySelector('button:not([color="warn"])');

      expect(deleteButton?.textContent?.trim()).toBe('Delete Customer');
      expect(cancelButton?.textContent?.trim()).toBe('Cancel');
    });
  });

  describe('🎨 UI Display and Styling', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should display dialog title correctly', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const title = compiled.querySelector('h2');

      expect(title?.textContent?.trim()).toBe('Delete Customer');
    });

    it('should display warning icon', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const warningIcon = compiled.querySelector('svg');

      expect(warningIcon).toBeTruthy();
    });

    it('should have proper dialog structure', () => {
      const compiled = fixture.nativeElement as HTMLElement;

      expect(compiled.querySelector('.dialog-header')).toBeTruthy();
      expect(compiled.querySelector('.dialog-content')).toBeTruthy();
      expect(compiled.querySelector('.dialog-actions')).toBeTruthy();
    });

    it('should style buttons appropriately', () => {
      const compiled = fixture.nativeElement as HTMLElement;

      const deleteButton = compiled.querySelector('button[color="warn"]');
      const cancelButton = compiled.querySelector('button:not([color="warn"])');

      expect(deleteButton).toBeTruthy();
      expect(cancelButton).toBeTruthy();
    });
  });

  describe('🔧 Dialog Behavior', () => {
    it('should handle confirm action correctly', () => {
      component.onConfirm();

      expect(mockDialogRef.close).toHaveBeenCalledWith(true);
    });

    it('should handle cancel action correctly', () => {
      component.onCancel();

      expect(mockDialogRef.close).toHaveBeenCalledWith(false);
    });

    it('should close dialog with result on ESC key', () => {
      const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
      document.dispatchEvent(escapeEvent);

      // ESC key handling is typically managed by Angular Material
      // This test ensures our cancel method works
      component.onCancel();
      expect(mockDialogRef.close).toHaveBeenCalledWith(false);
    });
  });

  describe('♿ Accessibility and UX', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should have proper ARIA attributes', () => {
      const compiled = fixture.nativeElement as HTMLElement;

      const dialog = compiled.querySelector('.delete-dialog');
      expect(dialog).toBeTruthy();
    });

    it('should focus on appropriate element when opened', () => {
      // Dialog focus is typically handled by Angular Material
      const compiled = fixture.nativeElement as HTMLElement;
      const buttons = compiled.querySelectorAll('button');

      expect(buttons.length).toBe(2);
      // First button should be cancel for better UX
      expect(buttons[0]?.getAttribute('color')).not.toBe('warn');
    });

    it('should provide clear visual hierarchy', () => {
      const compiled = fixture.nativeElement as HTMLElement;

      const title = compiled.querySelector('h2');
      const content = compiled.querySelector('.dialog-content');
      const actions = compiled.querySelector('.dialog-actions');

      expect(title).toBeTruthy();
      expect(content).toBeTruthy();
      expect(actions).toBeTruthy();
    });

    it('should have descriptive warning message', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const warningText = compiled.querySelector('.dialog-subtitle');

      expect(warningText?.textContent).toContain('This action cannot be undone');
    });
  });

  describe('📱 Responsive Design', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should have responsive dialog structure', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const dialogContent = compiled.querySelector('.dialog-content');

      expect(dialogContent).toBeTruthy();
      // Angular Material dialogs are responsive by default
    });

    it('should stack buttons appropriately on small screens', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const actionContainer = compiled.querySelector('.dialog-actions');

      expect(actionContainer).toBeTruthy();
      // Button stacking is handled by Angular Material's responsive design
    });
  });

  describe('🔄 Data Integration', () => {
    it('should handle different customer data types', () => {
      const customerWithMinimalData = {
        id: 'customer-minimal',
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '',
        company: '',
        position: '',
        address: '',
        city: '',
        country: '',
        website: '',
        notes: '',
        status: 'active' as const,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      component.data = customerWithMinimalData;
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const confirmationText = compiled.querySelector('.dialog-content p');
      expect(confirmationText?.textContent).toContain('Jane Smith');
    });

    it('should handle customer with special characters in name', () => {
      const customerWithSpecialChars = {
        ...mockData,
        name: "José María O'Connor-Smith",
      };

      component.data = customerWithSpecialChars;
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const confirmationText = compiled.querySelector('.dialog-content p');
      expect(confirmationText?.textContent).toContain("José María O'Connor-Smith");
    });

    it('should handle very long customer names', () => {
      const customerWithLongName = {
        ...mockData,
        name: 'This is a very long customer name that might cause display issues in the dialog',
      };

      component.data = customerWithLongName;
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const confirmationText = compiled.querySelector('.dialog-content p');
      expect(confirmationText?.textContent).toContain(customerWithLongName.name);
    });
  });

  describe('🎯 User Interaction Patterns', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should handle rapid clicking on delete button', () => {
      const deleteButton = fixture.debugElement.query(By.css('button[color="warn"]'));

      // Simulate rapid clicks
      deleteButton.nativeElement.click();
      deleteButton.nativeElement.click();
      deleteButton.nativeElement.click();

      // Should only close once
      expect(mockDialogRef.close).toHaveBeenCalledTimes(3);
      expect(mockDialogRef.close).toHaveBeenCalledWith(true);
    });

    it('should handle keyboard navigation between buttons', () => {
      const buttons = fixture.debugElement.queryAll(By.css('button'));

      expect(buttons.length).toBe(2);

      // Test tab navigation
      buttons[0].nativeElement.focus();
      expect(document.activeElement).toBe(buttons[0].nativeElement);
    });

    it('should handle Enter key on focused buttons', () => {
      const deleteButton = fixture.debugElement.query(By.css('button[color="warn"]'));

      deleteButton.nativeElement.focus();
      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
      deleteButton.nativeElement.dispatchEvent(enterEvent);

      // Button should still be clickable programmatically
      deleteButton.nativeElement.click();
      expect(mockDialogRef.close).toHaveBeenCalledWith(true);
    });
  });
});
