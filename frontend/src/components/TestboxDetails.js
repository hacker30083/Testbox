import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import TextareaAutosize from 'react-textarea-autosize';
import { Scrollbar } from 'react-scrollbars-custom';

const TestboxDetails = () => {
  const { id } = useParams();
  const [testbox, setTestbox] = useState(null);
  const [logs, setLogs] = useState('');

  useEffect(() => {
    const fetchTestboxDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/testboxes/${id}`);
        setTestbox(response.data);
        setLogs(response.data.logs);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTestboxDetails();
  }, [id]);

  const handleScrollToBottom = () => {
    const scrollbarsRef = React.createRef();
    if (scrollbarsRef.current) {
      scrollbarsRef.current.scrollToBottom();
    }
  };

  return (
    <div className="testbox-details">
      <h1>Testbox Details</h1>
      {testbox && (
        <div>
          <p>Name: {testbox.name}</p>
          <p>Status: {testbox.status}</p>
          <p>Created At: {testbox.createdAt}</p>
          <p>Updated At: {testbox.updatedAt}</p>
          <div className="logs-container">
            <Scrollbar
              ref={handleScrollToBottom}
              style={{ height: 300 }}
              onScrollStop={handleScrollToBottom}
            >
              <TextareaAutosize
                className="logs-textarea"
                value={logs}
                readOnly
              />
            </Scrollbar>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestboxDetails;