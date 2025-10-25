import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, MatToolbarModule, MatButtonModule, MatIconModule],
  template: `
    <div style="width: 100%; height: 100%; min-height: 600px; background: #f5f5f5;">
      <mat-toolbar color="primary">
    
        <span class="spacer"></span>
        <button mat-icon-button routerLink="/customers" routerLinkActive="active" matTooltip="View Customers">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 6H21M3 12H21M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button mat-icon-button routerLink="/customers/new" routerLinkActive="active" matTooltip="Add Customer">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </mat-toolbar>

      <main class="main-content">
        <div
          style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin: 20px;"
        >
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `,
  styles: [
    `
      .spacer {
        flex: 1 1 auto;
      }

      .main-content {
        padding: 20px;
        max-width: 1200px;
        margin: 0 auto;
      }

      .active {
        background-color: rgba(255, 255, 255, 0.1);
      }
    `,
  ],
})
export class App {
  protected readonly title = signal('Customer Management MFE');
}
