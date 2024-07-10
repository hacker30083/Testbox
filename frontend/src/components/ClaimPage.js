import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const ClaimPage = () => {
  const { id } = useParams();
  const history = useHistory();
  const [files, setFiles] = useState(null);
  const [repoUrl, setRepoUrl] = useState('');

  const handleFileChange = (event) => {
    setFiles(event.target.files);
  };

  const handleRepoChange = (event) => {
    setRepoUrl(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    if (files) {
      Array.from(files).forEach(file => formData.append('files', file));
    }
    if (repoUrl) {
      formData.append('repoUrl', repoUrl);
    }

    axios.post(`http://localhost:5000/api/testboxes/${id}/setup`, formData)
      .then(response => {
        alert('Testbox setup successfully');
        history.push(`/testbox/${id}`);
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="claim-page">
      <h1>Setup Testbox</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Upload Files:</label>
          <input type="file" multiple onChange={handleFileChange} />
        </div>
        <div>
          <label>Repository URL:</label>
          <input type="text" value={repoUrl} onChange={handleRepoChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ClaimPage;
