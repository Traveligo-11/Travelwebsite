import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Replace ReactDOM.render with new API
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);