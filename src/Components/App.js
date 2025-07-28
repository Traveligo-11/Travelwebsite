// src/App.js
import React, { useState } from 'react';
import Login from './components/Login';
import DataViewer from './components/DataViewer';

function App() {
  const [token, setToken] = useState(localStorage.getItem('apiToken') || null);

  const handleLoginSuccess = (newToken) => {
    localStorage.setItem('apiToken', newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('apiToken');
    setToken(null);
  };

  return (
    <div className="App">
      {!token ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        <>
          <button onClick={handleLogout}>Logout</button>
          <DataViewer token={token} />
        </>
      )}
    </div>
  );
}

export default App;