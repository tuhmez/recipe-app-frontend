import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { theme } from './app-styles';
import logo from './logo.svg';
import './App.css';

import { Button } from '@material-ui/core';
import { ping, getAllRecipes } from './communications/index';
import { RecipeMessage } from './proto/recipe_pb';

const onGetAllRecipes = () => {
  getAllRecipes(
    (response: RecipeMessage) => {
    console.info(response.toObject());
    },
    (err: any) => {
      throw err;
    },
    () => {
      console.info('closed');
    }
  )
};

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
          <Button variant='contained' onClick={onGetAllRecipes}>GET All RECIPES</Button>
        </header>
      </div>  
    </ThemeProvider>
  );
}

export default App;
