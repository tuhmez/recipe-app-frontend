import React from 'react';
import ReactDOM from 'react-dom';
import { AppWrapper } from './AppWrapper';
import { theme } from './app-styles';
import { App } from './components/App';
// import reportWebVitals from './reportWebVitals';
import { configureStore } from './redux/configureStore';
import './index.css';

const store = configureStore({});

ReactDOM.render(
  <React.StrictMode>
    <AppWrapper theme={theme} store={store}>
      <App />
    </AppWrapper>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
