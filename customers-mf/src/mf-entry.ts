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
      <div class="header-section">
        <div class="title-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" fill="currentColor"/>
            <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" fill="currentColor"/>
            <path d="M20 7C20 8.10457 19.1046 9 18 9C16.8954 9 16 8.10457 16 7C16 5.89543 16.8954 5 18 5C19.1046 5 20 5.89543 20 7Z" fill="currentColor"/>
            <path d="M18 14C15.7909 14 14 15.7909 14 18V21H22V18C22 15.7909 20.2091 14 18 14Z" fill="currentColor"/>
          </svg>
        </div>
        <div class="title-content">
          <h1>Customer Management</h1>
          <p>Angular 20+ Microfrontend with Zone.js</p>
        </div>
      </div>
      
      
      <div class="features">
        <h3>Features Available:</h3>
        <div class="features-grid">
          <div class="feature-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" fill="currentColor"/>
            </svg>
            Standalone Components
          </div>
          <div class="feature-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="currentColor"/>
            </svg>
            Signals API
          </div>
          <div class="feature-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" fill="currentColor"/>
              <path d="M12 16L13.09 22.26L22 23L13.09 23.74L12 30L10.91 23.74L2 23L10.91 22.26L12 16Z" fill="currentColor" fillOpacity="0.6"/>
            </svg>
            Zone.js Change Detection
          </div>
          <div class="feature-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" fill="currentColor"/>
              <path d="M12 16L13.09 22.26L22 23L13.09 23.74L12 30L10.91 23.74L2 23L10.91 22.26L12 16Z" fill="currentColor" fillOpacity="0.6"/>
            </svg>
            Module Federation
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .customer-mf-wrapper {
        padding: 32px;
        border: 2px solid #4caf50;
        border-radius: 16px;
        margin: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        position: relative;
        overflow: hidden;
      }
      
      .customer-mf-wrapper::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                    radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
        pointer-events: none;
        z-index: 0;
      }
      
      .header-section {
        display: flex;
        align-items: center;
        gap: 16px;
        margin-bottom: 24px;
        position: relative;
        z-index: 1;
      }
      
      .title-icon {
        width: 48px;
        height: 48px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
      
      .title-content h1 {
        margin: 0 0 8px 0;
        font-size: 2.25rem;
        font-weight: 700;
        text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
      }
      
      .title-content p {
        margin: 0;
        opacity: 0.9;
        font-size: 1.1rem;
        font-weight: 500;
      }
      
      .status-success {
        background: rgba(76, 175, 80, 0.9);
        padding: 16px 20px;
        border-radius: 12px;
        margin: 24px 0;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 12px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        position: relative;
        z-index: 1;
      }
      
      .features {
        background: rgba(255, 255, 255, 0.1);
        padding: 24px;
        border-radius: 12px;
        margin-top: 24px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        position: relative;
        z-index: 1;
      }
      
      .features h3 {
        margin: 0 0 20px 0;
        font-size: 1.25rem;
        font-weight: 600;
      }
      
      .features-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 16px;
      }
      
      .feature-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 8px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        font-weight: 500;
        transition: all 0.3s ease;
      }
      
      .feature-item:hover {
        background: rgba(255, 255, 255, 0.1);
        transform: translateY(-2px);
      }
      
      @media (max-width: 768px) {
        .customer-mf-wrapper {
          padding: 24px;
          margin: 16px;
        }
        
        .header-section {
          flex-direction: column;
          text-align: center;
          gap: 12px;
        }
        
        .title-content h1 {
          font-size: 1.75rem;
        }
        
        .features-grid {
          grid-template-columns: 1fr;
        }
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
