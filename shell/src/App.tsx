import React from "react";
import "./App.css";
import CustomersMF from "./components/CustomersMF";

const App = () => {
  return (
    <div className="app">
      {/* Professional Header */}
      <header className="app-header">
        <div className="header-container">
        <div className="brand-section">
          <div className="brand-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 21H21L19 19H5L3 21Z" fill="currentColor"/>
              <path d="M5 19V7L12 2L19 7V19H5Z" fill="currentColor" fillOpacity="0.8"/>
              <path d="M9 11H15V13H9V11Z" fill="white"/>
              <path d="M9 15H15V17H9V15Z" fill="white"/>
            </svg>
          </div>
          <div className="brand-text">
            <h1 className="brand-title">Enterprise Portal</h1>
            <p className="brand-subtitle">Microfrontend Architecture</p>
          </div>
        </div>

          <div className="header-status">
            <div className="status-indicator">
              <div className="status-dot"></div>
              <span className="status-text">Live System</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="currentColor"/>
            </svg>
            <span>Modern Architecture</span>
          </div>

          <div className="hero-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" fill="currentColor"/>
              <path d="M12 16L13.09 22.26L22 23L13.09 23.74L12 30L10.91 23.74L2 23L10.91 22.26L12 16Z" fill="currentColor" fillOpacity="0.6"/>
            </svg>
          </div>

          <h1 className="hero-title">Modern Microfrontend Platform</h1>
          <p className="hero-subtitle">
            Experience seamless integration between React and Angular frameworks
            with cutting-edge Module Federation technology.
          </p>

          <div className="tech-badges">
            <div className="tech-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" fill="currentColor"/>
              </svg>
              React 18
            </div>
            <div className="tech-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.93 12.645c-.033-.051-.113-.051-.146 0-.033.051-.033.113 0 .164l.146.146c.051.033.113.033.146 0l.146-.146c.033-.051.033-.113 0-.164l-.146-.146zM12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" fill="currentColor"/>
              </svg>
              Angular 20
            </div>
            <div className="tech-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" fill="currentColor"/>
                <path d="M12 16L13.09 22.26L22 23L13.09 23.74L12 30L10.91 23.74L2 23L10.91 22.26L12 16Z" fill="currentColor" fillOpacity="0.6"/>
              </svg>
              Module Federation
            </div>
            <div className="tech-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="currentColor"/>
              </svg>
              Real-time
            </div>
          </div>
        </div>
      </section>

      {/* Microfrontend Section */}
      <section className="microfrontend-section">
        <div className="section-header">
          <div className="section-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" fill="currentColor"/>
              <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" fill="currentColor"/>
              <path d="M20 7C20 8.10457 19.1046 9 18 9C16.8954 9 16 8.10457 16 7C16 5.89543 16.8954 5 18 5C19.1046 5 20 5.89543 20 7Z" fill="currentColor"/>
              <path d="M18 14C15.7909 14 14 15.7909 14 18V21H22V18C22 15.7909 20.2091 14 18 14Z" fill="currentColor"/>
            </svg>
          </div>
          <div>
            <h2 className="section-title">Customer Management System</h2>
            <p className="section-subtitle">
              Advanced customer relationship management powered by Angular 20+
              with modern signals and reactive forms.
            </p>
          </div>
        </div>

        <div className="microfrontend-container">
          <CustomersMF />
        </div>
      </section>
    </div>
  );
};

export default App;
