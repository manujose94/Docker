import React from 'react';
import logo from './logo.svg';

import './App.css';
import Navigation from './components/Navbar';
import Routes from './Routes';


function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello World from container TEST
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
