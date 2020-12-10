import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../context/authContext/authContext';


const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  return (
    <Route
      {...rest}
      render={props =>
        !user && !user ? (

          <Redirect to='/login' />
        ) : (
            <Component {...props} />
          )
      }
    />
  );
};

export default PrivateRoute;

