import { Spin } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { compose } from 'redux';

class LayoutRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      default: null,
    };
  }
  render() {
    const {
      component: YoursComponent,
      authReducer,
      name,
      ...remainProps
    } = this.props;

    return (
      <Route
        {...remainProps}
        render={(routeProps) => <YoursComponent {...routeProps} />}
      />
    );
  }
}

const mapStatetoProps = ({ authReducer }) => ({
  authReducer,
});

const mapDispatchtoProps = null;

const withConenct = connect(mapStatetoProps, mapDispatchtoProps);
export default compose(withConenct)(LayoutRoute);
