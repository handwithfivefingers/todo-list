import React, { Component } from 'react';
import { Layout, Breadcrumb } from 'antd';
import FooterLayout from '../Footer';
import HeaderLayout from '../Header';
const { Content, Header } = Layout;

class ContentLayout extends Component {
  render() {
    return (
      <Layout className="site-layout">
        <HeaderLayout />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Project</Breadcrumb.Item>
            <Breadcrumb.Item>Daily Meal</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            {this.props.children}
          </div>
        </Content>
        <FooterLayout />
      </Layout>
    );
  }
}

export default ContentLayout;
