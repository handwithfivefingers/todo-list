import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { TASK_ROUTE } from './../../../constant/route';
import Logo from './../../../logo.svg';
const { SubMenu } = Menu;
const { Sider } = Layout;

class SiderLayout extends Component {
  state = {
    collapsed: false,
  };
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  render() {
    const { collapsed } = this.state;
    return (
      <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
        <div className="logo" style={{ background: `url(${Logo}) center no-repeat` }} />

        <Menu
          theme="dark"
          defaultSelectedKeys={this.props.match.path}
          mode="inline"
        >
          {TASK_ROUTE.map((route) => {
            return (
              <Menu.Item key={route.path} icon={<PieChartOutlined />}>
                <NavLink to={route.path}>{route.name}</NavLink>
              </Menu.Item>
            );
          })}
          <SubMenu key="sub1" icon={<UserOutlined />} title="User">
            <Menu.Item key="3">Tom</Menu.Item>
            <Menu.Item key="4">Bill</Menu.Item>
            <Menu.Item key="5">Alex</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
            <Menu.Item key="6">Team 1</Menu.Item>
            <Menu.Item key="8">Team 2</Menu.Item>
          </SubMenu>
          <Menu.Item key="9" icon={<FileOutlined />}>
            Files
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default SiderLayout;
