import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App' // Make sure this path is correct
import './index.css'
// src/main.jsx
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)