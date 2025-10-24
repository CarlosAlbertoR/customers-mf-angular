import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, MatToolbarModule, MatButtonModule, MatIconModule],
  template: `
    <mat-toolbar color="primary">
      <span>Customer Management</span>
      <span class="spacer"></span>
      <button mat-icon-button routerLink="/customers" routerLinkActive="active">
        <mat-icon>list</mat-icon>
      </button>
      <button mat-icon-button routerLink="/customers/new" routerLinkActive="active">
        <mat-icon>add</mat-icon>
      </button>
    </mat-toolbar>
    
    <main class="main-content">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
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
  `]
})
export class App {
  protected readonly title = signal('Customer Management MFE');
}
