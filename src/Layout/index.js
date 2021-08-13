import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import SiderLayout from '../components/Layout/Sidebar';
import ContentLayout from '../components/Layout/Content';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PrivateRoute from './PrivateRoute';
class LayoutRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      default: null,
    };
  }
  render() {
    const { component: YoursComponent, ...remainProps } = this.props;
    const { authReducer } = this.props;
    if (authReducer.authenticate) {

    }
    return (
      <Layout style={{ minHeight: '100vh', overflowX: 'hidden' }}>
        <Route
          {...remainProps}
          render={(routeProps) => {
            return (
              <>
                <SiderLayout {...routeProps} />
                <ContentLayout>
                  <YoursComponent {...routeProps} />
                </ContentLayout>
              </>
            );
          }}
        />
      </Layout>
    );
  }
}
const mapStatetoProps = state => ({
  authReducer: state.authReducer
})
const mapDispatchtoProps = null;
const withConenct = connect(mapStatetoProps, mapDispatchtoProps)
export default compose(withConenct)(LayoutRoute);
