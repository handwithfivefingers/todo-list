import { Breadcrumb, Layout } from 'antd';
import React, { Component } from 'react';
import FooterLayout from '../Footer';
import HeaderLayout from '../Header';
import history from '../../../helper/history';
import { TASK_ROUTE } from '../../../constant/route';
const { Content } = Layout;

class ContentLayout extends Component {
  render() {
    return (
      <Layout className="site-layout">
        <HeaderLayout />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Project Management</Breadcrumb.Item>
            {TASK_ROUTE.map((item, index) => {
              if (item.path === this.props.location.pathname) {
                return <Breadcrumb.Item key={`${item.name}-${index}`}>{item.name}</Breadcrumb.Item>
              }
            })}
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
