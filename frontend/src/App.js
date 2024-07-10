import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//import Dashboard from './components/Dashboard';
import TestboxDetails from './components/TestboxDetails';
import ClaimPage from './components/ClaimPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/testbox/:id" exact component={TestboxDetails} />
          <Route path="/testbox/:id/claim" exact component={ClaimPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
