import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import SiderLayout from '../components/Layout/Sidebar';
import ContentLayout from '../components/Layout/Content';
import { Layout } from 'antd';
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
        render={(routeProps) => {
          return (
            <Layout style={{ minHeight: '100vh', overflowX:'hidden' }}>
              <SiderLayout {...routeProps} />
              <ContentLayout>
                <YoursComponent {...routeProps} />
              </ContentLayout>
            </Layout>
          );
        }}
      />
    );
  }
}
export default LayoutRoute;
