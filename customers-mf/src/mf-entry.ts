// Module Federation entry point with Zone.js support
import 'zone.js';
import '@angular/compiler';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';

@Component({
  selector: 'mf-customer-app',
  standalone: true,
  template: `
    <div class="customer-mf-wrapper">
      <h1>Customer Management</h1>
      <p>Angular 20+ Microfrontend with Zone.js</p>
      <div class="status-success">✅ Microfrontend loaded successfully!</div>
      <div class="features">
        <h3>Features Available:</h3>
        <ul>
          <li>• Standalone Components</li>
          <li>• Signals API</li>
          <li>• Zone.js Change Detection</li>
          <li>• Module Federation</li>
        </ul>
      </div>
    </div>
  `,
  styles: [
    `
      .customer-mf-wrapper {
        padding: 24px;
        border: 2px solid #4caf50;
        border-radius: 12px;
        margin: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        text-align: center;
        font-family: 'Segoe UI', sans-serif;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      }
      h1 {
        margin: 0 0 10px 0;
        font-size: 2rem;
        font-weight: 600;
      }
      p {
        margin: 0 0 20px 0;
        opacity: 0.9;
      }
      .status-success {
        background: rgba(76, 175, 80, 0.9);
        padding: 12px;
        border-radius: 6px;
        margin: 20px 0;
        font-weight: bold;
      }
      .features {
        background: rgba(255, 255, 255, 0.1);
        padding: 16px;
        border-radius: 8px;
        margin-top: 20px;
      }
      .features h3 {
        margin: 0 0 12px 0;
      }
      .features ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .features li {
        padding: 4px 0;
        text-align: left;
      }
    `,
  ],
})
export class CustomerMFComponent implements OnInit, OnDestroy {
  ngOnInit() {
    console.log('🚀 Customer MF Component initialized with Zone.js');
  }

  ngOnDestroy() {
    console.log('🧹 Customer MF Component destroyed');
  }
}

// Bootstrap function for Module Federation
export const bootstrap = async (element: HTMLElement) => {
  try {
    console.log('Bootstrapping Angular microfrontend with Zone.js...');

    // Clear existing content
    element.innerHTML = '';

    // Create Angular root element
    const angularRoot = document.createElement('mf-customer-app');
    element.appendChild(angularRoot);

    // Bootstrap the application
    const app = await bootstrapApplication(CustomerMFComponent, appConfig);

    console.log('Angular microfrontend bootstrapped successfully');
    return {
      destroy: () => {
        console.log('Destroying Angular microfrontend...');
        app.destroy();
        if (element.contains(angularRoot)) {
          angularRoot.remove();
        }
      },
    };
  } catch (error) {
    console.error('Error bootstrapping Angular microfrontend:', error);
    throw error;
  }
};

// Export component as default
export default CustomerMFComponent;
