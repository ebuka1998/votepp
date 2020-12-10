import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AuthState from './context/authContext/AuthState';
import PollState from './context/pollContext/PollState';




ReactDOM.render(
  <React.StrictMode>
    <AuthState>
      <PollState>
        <App />
      </PollState>
    </AuthState>
  </React.StrictMode>,
  document.getElementById('root')
);


