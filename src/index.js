import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components'

import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <h1>Welcome to Gif Maker!!!</h1>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
