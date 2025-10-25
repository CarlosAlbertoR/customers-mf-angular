import React from "react";
import "./App.css";
import CustomersMF from "./components/CustomersMF";

const App = () => {
  return (
    <div className="content">
      <div className="shell-header">
        <h1>Microfrontend Shell</h1>
        <p>
          This shell application loads microfrontends from different frameworks
        </p>
      </div>

      <div className="microfrontends">
        <CustomersMF />
      </div>
    </div>
  );
};

export default App;
