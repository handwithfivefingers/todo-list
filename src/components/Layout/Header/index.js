import { Layout } from 'antd';
import React, { Component } from 'react';
const { Header } = Layout;
class HeaderLayout extends Component {
  render() {
    return (
      <Header className="site-layout-background" style={{ padding: 0 }} />
    );
  }
}

export default HeaderLayout;
