import 'zone.js';
import '@angular/compiler';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// Function to bootstrap Angular application for Module Federation
export const bootstrapAngularMF = async (element: HTMLElement) => {
  try {
    // Clear any existing content
    element.innerHTML = '';

    // Set element styles to ensure proper display
    element.style.width = '100%';
    element.style.height = '100%';
    element.style.display = 'block';
    element.style.position = 'relative';

    // Create Angular root element with proper app-root tag
    const angularRoot = document.createElement('app-root');
    angularRoot.style.width = '100%';
    angularRoot.style.height = '100%';
    angularRoot.style.display = 'block';
    angularRoot.style.minHeight = '500px';
    element.appendChild(angularRoot);

    // Bootstrap Angular application
    const appRef = await bootstrapApplication(App, appConfig);

    // Force initial change detection
    appRef.tick();

    // Check if content was rendered after a short delay
    setTimeout(() => {
      const appElement = element.querySelector('app-root');

      if (appElement && appElement.children.length === 0) {
        console.warn('Angular app may not have rendered properly, forcing change detection');
        appRef.tick();

        // If still empty, add a fallback message
        setTimeout(() => {
          if (appElement.children.length === 0) {
            console.error('Angular app failed to render content');
            appElement.innerHTML = `
              <div style="padding: 24px; background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; color: #856404; text-align: center;">
                <h3 style="margin: 0 0 12px 0;">⚠️ Customer Management Loading Issue</h3>
                <p style="margin: 0;">The Angular application loaded but content is not visible.</p>
                <p style="margin: 8px 0 0 0; font-size: 14px; opacity: 0.8;">This might be a routing or component loading issue.</p>
              </div>
            `;
          }
        }, 2000);
      }
    }, 1000);

    return {
      appRef,
      destroy: () => {
        try {
          appRef.destroy();
          element.innerHTML = '';
        } catch (error) {
          console.error('Error destroying Angular app:', error);
        }
      },
    };
  } catch (error) {
    console.error('Error bootstrapping Angular microfrontend:', error);
    element.innerHTML = `
      <div style="padding: 24px; border: 1px solid #ff4444; border-radius: 8px; background: #ffebee; color: #d32f2f; text-align: center;">
        <h3 style="margin: 0 0 16px 0;">🚫 Customer Management Unavailable</h3>
        <p style="margin: 0 0 12px 0;"><strong>Error:</strong> ${error}</p>
        <p style="margin: 0; font-size: 14px; opacity: 0.8;">Make sure the customers microfrontend is running on port 3001</p>
      </div>
    `;
    throw error;
  }
}; // Export the bootstrap function as default for Module Federation
export default bootstrapAngularMF;

// Also export with the specific name 'bootstrap'
export const bootstrap = bootstrapAngularMF;
