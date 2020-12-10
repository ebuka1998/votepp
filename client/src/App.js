import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import PollPage from './pages/PollPage';
import PrivateRoute from './utils/PrivateRoute';
import CreatePage from './pages/CreatePage';


function App() {
  return (
    <Router>
      {/* <Route exact  path='/' component={HomePage} /> */}
      <PrivateRoute exact path='/' component={HomePage} />
      <Route   path='/poll/:id' component={PollPage} />
      <Route  path='/login' component={Login} />
      <Route  path='/create' component={CreatePage} />
    </Router>
  );
}

export default App;
