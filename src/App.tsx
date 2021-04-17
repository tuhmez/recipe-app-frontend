import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { theme } from './app-styles';
import logo from './logo.svg';
import './App.css';

import { Button } from '@material-ui/core';
import { ping } from './communications/index';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <Button variant='contained' onClick={ping}>PING</Button>
        </header>
      </div>  
    </ThemeProvider>
  );
}

export default App;
