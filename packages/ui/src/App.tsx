import React, { useEffect } from 'react';
import logo from "logo.svg";
import MIA from "services/web3/mia";

import './App.css';


function App() {
  const componentDidMount = () => {
    getMia();
  }
  const getMia = async () => {
    MIA.getInstance()
  }
  useEffect(componentDidMount, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          MIA DAO
        </p>
      </header>
    </div>
  );
}

export default App;
