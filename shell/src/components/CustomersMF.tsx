import React, { useEffect, useRef } from 'react';

const CustomersMF: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadAngularMF = async () => {
      try {
        // Import the Angular microfrontend
        const module = await import('customers-mf/Component');
        
        if (containerRef.current && module.default) {
          // Clear previous content
          containerRef.current.innerHTML = '';
          
          // Create Angular root element
          const angularElement = document.createElement('app-root');
          containerRef.current.appendChild(angularElement);
          
          // Bootstrap Angular component
          if (module.default.bootstrap) {
            module.default.bootstrap(angularElement);
          } else {
            console.log('Angular component loaded:', module.default);
          }
        }
      } catch (error) {
        console.error('Error loading Angular microfrontend:', error);
        if (containerRef.current) {
          containerRef.current.innerHTML = `
            <div style="padding: 20px; border: 1px solid #ccc; border-radius: 4px; background: #f9f9f9;">
              <h3>Error Loading Customer Management</h3>
              <p>Make sure the customers microfrontend is running on port 3001</p>
              <p>Error: ${error}</p>
              <p>Try accessing directly: <a href="http://localhost:3001" target="_blank">http://localhost:3001</a></p>
            </div>
          `;
        }
      }
    };

    loadAngularMF();
  }, []);

  return (
    <div className="customers-mf-container">
      <div ref={containerRef} style={{ minHeight: '400px' }}>
        <div style={{ padding: '20px', textAlign: 'center' }}>
          Loading Customer Management...
        </div>
      </div>
    </div>
  );
};

export default CustomersMF;
