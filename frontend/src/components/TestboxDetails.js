import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TestboxDetails = () => {
  const { id } = useParams();
  const [testbox, setTestbox] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/testboxes/${id}`)
      .then(response => setTestbox(response.data))
      .catch(error => console.error(error));
  }, [id]);

  if (!testbox) return <div>Loading...</div>;

  return (
    <div className="testbox-details">
      <h1>{testbox.name}</h1>
      <div>Status: {testbox.status}</div>
      <div>Services:</div>
      <ul>
        {testbox.services.map(service => (
          <li key={service.name}>{service.name} - {service.status}</li>
        ))}
      </ul>
      <div>Jobs:</div>
      <ul>
        {testbox.jobs.map(job => (
          <li key={job.name}>{job.name} - {job.status}</li>
        ))}
      </ul>
    </div>
  );
};

export default TestboxDetails;
