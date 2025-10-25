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
        <span>🏢 Customer Management</span>
        <span class="spacer"></span>
        <button mat-icon-button routerLink="/customers" routerLinkActive="active">
          <mat-icon>list</mat-icon>
        </button>
        <button mat-icon-button routerLink="/customers/new" routerLinkActive="active">
          <mat-icon>add</mat-icon>
        </button>
      </mat-toolbar>

      <main class="main-content">
        <div
          style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin: 20px;"
        >
          <div
            style="text-align: center; padding: 20px; background: #e8f5e8; border-radius: 4px; margin-bottom: 20px;"
          >
            <h2 style="color: #2e7d32; margin: 0;">
              ✅ Angular Microfrontend Loaded Successfully!
            </h2>
            <p style="color: #558b2f; margin: 10px 0 0 0;">Customer management system is ready</p>
          </div>
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
