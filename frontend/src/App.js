import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import TestboxDetails from './components/TestboxDetails';
import ClaimPage from './components/ClaimPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/testbox/:id" element={<TestboxDetails />} />
          <Route path="/testbox/:id/claim" element={<ClaimPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
