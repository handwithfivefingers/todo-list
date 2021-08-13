import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector(state => state.authReducer);
  const { token } = auth.token;
  <Route  {...rest} render={(props) => {
    if (token) {
      <Component  {...props} />
    } else {
      <Redirect to="/login" />
    }
  }} />
}

export default PrivateRoute;
