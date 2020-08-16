import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Navigation from './navigation';
import App from './App';
import styles from './App.module.css';

ReactDOM.render(
  <React.StrictMode>
      <App>
          <Navigation />
      </App>
  </React.StrictMode>,
  document.getElementById('root')
);