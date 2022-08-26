import { Spin } from 'antd';
import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';

class LayoutRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      default: null,
    };
  }
  render() {
    
    const { component: YoursComponent, ...remainProps } = this.props;

    return (
      <Route
        {...remainProps}
        render={(routeProps) => <YoursComponent {...routeProps} />}
      />
    );
  }
}

export default LayoutRoute;
