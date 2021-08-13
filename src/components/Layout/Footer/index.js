import React, { Component } from 'react';
import { Layout } from 'antd';
const { Footer } = Layout;
class FooterLayout extends Component {
  render() {
    return (
      <Footer style={{ textAlign: 'center' }}>
        Truyen Mai ©2019
      </Footer>
    );
  }
}

export default FooterLayout;
