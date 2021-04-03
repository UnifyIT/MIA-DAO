import React from 'react';
// import logo from "logo.svg";

import { AppRouter } from "containers";

import 'styles/App.css';

function App() {

  return (
    <div className="App">
      {/* 
        <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      */}
      <AppRouter />
    </div>
  );
}

export default App;