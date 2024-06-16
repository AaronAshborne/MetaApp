import React, { useEffect, useState } from 'react';
import './Data.css';

function Data() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/user-data')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='disbody'>
    <div className="distinctive-container">
      <h1 className="distinctive-title">Meta Data</h1>
      {loading && <p className="distinctive-loading">Loading...</p>}
      {error && (
        <div className="distinctive-error">
          <p className="distinctive-error-message">Error: {error.message}</p>
          <p className="distinctive-error-details">Please check the server logs for more details.</p>
        </div>
      )}
      {data ? (
        <div className="distinctive-meta-data">
          <p><span className="distinctive-label">Name:</span> {data.name}</p>
          <p><span className="distinctive-label">Category:</span> {data.category}</p>
          <p><span className="distinctive-label">ID:</span> {data.id}</p>
          <p>
            <span className="distinctive-label">Link:</span> <a href={data.link} className="distinctive-link">{data.link}</a>
          </p>
        </div>
      ) : (
        <p className="distinctive-no-data">No data available</p>
      )}
    </div>
    </div>
  );
}

export default Data;
