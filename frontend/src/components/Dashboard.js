import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [testboxes, setTestboxes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/testboxes')
      .then(response => setTestboxes(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="dashboard">
      {testboxes.map(tb => (
        <div key={tb.id} className={`testbox ${tb.status.toLowerCase()}`}>
          <div className="header">{tb.name}</div>
          <div className="status">{tb.status}</div>
          {tb.status === 'READY' && <Link to={`/testbox/${tb.id}/claim`}><button>Claim</button></Link>}
          <Link to={`/testbox/${tb.id}`}><button>View Details</button></Link>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
