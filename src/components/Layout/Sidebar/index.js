import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import {
  FolderOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { TASK_SIDE } from './../../../constant/route';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Logo from './../../../logo.svg';
const { SubMenu } = Menu;
const { Sider } = Layout;
class SiderLayout extends Component {
  state = {
    collapsed: false,
    breakpoint: false,
  };
  onCollapse = (collapsed) => {
    // console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    return (
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={this.onCollapse}
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          this.setState({ breakpoint: broken });
        }}
        width={`${this.state.breakpoint ? '65px' : '200px'}`}
        // style={{
        //   width: `${this.state.breakpoint ? '50px' : '200px'}`,
        // }}
      >
        <div
          className="logo"
          style={{ background: `url(${Logo}) center no-repeat` }}
        />

        <Menu
          theme="dark"
          defaultSelectedKeys={this.props.match.path}
          mode="inline"
        >
          {TASK_SIDE.map((route, index) => {
            return (
              <Menu.Item
                key={route.path}
                icon={index === 0 ? <PieChartOutlined /> : <FolderOutlined />}
              >
                <NavLink to={route.path}>{route.name}</NavLink>
              </Menu.Item>
            );
          })}
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
const mapStatetoProps = (state) => ({
  taskReducer: state.taskReducer,
});
const mapDispatchtoProps = null;
const withConnect = connect(mapStatetoProps, mapDispatchtoProps);
export default compose(withConnect)(SiderLayout);
