import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../../../hooks/use-auth';

const PrivateRoute = ({ children, ...rest }) => {
    const auth = useAuth();
    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth.user ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  };
  export default PrivateRoute;