import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Loader from './Loader';
import useUser from '../../lib/useUser';

const PrivateRoute = ({ component: View, ...args }) => {
  const { user, loading } = useUser();

  return (
    <Route
      {...args}
      render={({ location }) => {
        if (!loading) {
          if (user) {
            return <View />;
          }

          return (
            <Redirect
              to={{
                pathname: '/',
                state: { from: location },
              }}
            />
          );
        }

        return <Loader centeredOnScreen />;
      }}
    />
  );
};

export default PrivateRoute;
