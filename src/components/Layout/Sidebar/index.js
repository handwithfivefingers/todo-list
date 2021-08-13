import React, { Component } from 'react';
import { Layout, Menu, Button } from 'antd';
import {
  FolderOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { NavLink, Redirect } from 'react-router-dom';
import { TASK_SIDE } from './../../../constant/route';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import Logo from './../../../logo.svg';
import { AuthAction } from './../../../actions';
const { SubMenu } = Menu;
const { Sider } = Layout;
class SiderLayout extends Component {
  state = {
    collapsed: false,
    breakpoint: false,
  };
  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };
  Signout = () => {
    const { authActionCreator } = this.props;
    const { userLogout } = authActionCreator;
    userLogout();
  }
  render() {
    const { collapsed } = this.state;
    const { authReducer } = this.props;
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
          <Menu.Item key={'/'} icon={<PieChartOutlined />} >
            <NavLink to="/">Home</NavLink>
          </Menu.Item>
          <Menu.Item key={'/project'} icon={<FolderOutlined />} >
            <NavLink to="/project">Project</NavLink>
          </Menu.Item>
          {
            authReducer.authenticate && authReducer.token
              ?
              <>
                <Menu.Item key={'/profile'} icon={<PieChartOutlined />} >
                  <NavLink to="/profile">Profile</NavLink>
                </Menu.Item>
                <Menu.Item>
                  <Button type="link" icon={<PieChartOutlined />} style={{ paddingLeft: 0, color: 'rgba(255, 255, 255, 0.65)' }} onClick={this.Signout}>Sign out</Button>
                </Menu.Item>

              </>
              :
              <Menu.Item key={'/login'} icon={<PieChartOutlined />} >
                <NavLink to="/login">Login</NavLink>
              </Menu.Item>
          }

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
  authReducer: state.authReducer
});
const mapDispatchtoProps = dispatch => ({
  authActionCreator: bindActionCreators(AuthAction, dispatch),
});
const withConnect = connect(mapStatetoProps, mapDispatchtoProps);
export default compose(withConnect)(SiderLayout);
