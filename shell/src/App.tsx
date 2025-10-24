import './App.css';
import CustomersMF from './components/CustomersMF';

const App = () => {
  return (
    <div className="content">
      <div className="shell-header">
        <h1>Microfrontend Shell</h1>
        <p>This shell application loads microfrontends from different frameworks</p>
      </div>

      <div className="microfrontends">
        <div className="mf-section">
          <h2>Angular Microfrontend (Customers)</h2>
          <CustomersMF />
        </div>
      </div>
    </div>
  );
};

export default App;
