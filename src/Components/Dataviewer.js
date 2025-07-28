// src/components/DataViewer.js
import React, { useState, useEffect } from 'react';
import { fetchProtectedData } from '../api';

const DataViewer = ({ token }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [endpoint, setEndpoint] = useState('/api/some-endpoint');

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await fetchProtectedData(token, endpoint);
      setData(result);
    } catch (err) {
      setError(err.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token, endpoint]);

  return (
    <div>
      <h2>API Data Viewer</h2>
      <div>
        <label>Endpoint:</label>
        <input
          type="text"
          value={endpoint}
          onChange={(e) => setEndpoint(e.target.value)}
        />
        <button onClick={fetchData} disabled={loading}>
          {loading ? 'Loading...' : 'Refresh'}
        </button>
      </div>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {data && (
        <div>
          <h3>Response Data:</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default DataViewer;