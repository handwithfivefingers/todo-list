import {
  FolderOutlined, LogoutOutlined, PieChartOutlined, TeamOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Layout, Menu, Switch } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { bindActionCreators, compose } from 'redux';
import { AuthAction } from './../../../actions';
import Logo from './../../../logo.svg';
const { SubMenu } = Menu;
const { Sider } = Layout;
class SiderLayout extends Component {
  state = {
    theme: 'dark',
  };
  Signout = () => {
    const { authActionCreator } = this.props;
    const { userLogout } = authActionCreator;
    userLogout();
  }
  render() {
    const { authReducer, match } = this.props;
    return (
      <>
        <div className="sidebar-mobile">
          <Menu
            theme={this.state.theme}
            defaultSelectedKeys={match.path}
            mode="vertical"
            style={{ background: 'inherit' }}
          >
            <Menu.Item key={'/'} icon={<PieChartOutlined />} >
              <NavLink to="/">Home</NavLink>
            </Menu.Item>
            <Menu.Item key={'/project'} icon={<PieChartOutlined />} >
              <NavLink to="/project">Project</NavLink>
            </Menu.Item>
            {
              authReducer.authenticate && authReducer.token ?
                <>
                  <Menu.Item key={'/profile'} icon={<PieChartOutlined />} >
                    <NavLink to="/profile">Profile</NavLink>
                  </Menu.Item>
                  <Menu.Item key={'/signout'} icon={<PieChartOutlined />} >
                    <a onClick={this.Signout}>
                      Sign out
                    </a>
                  </Menu.Item>
                </> :
                <>
                  <Menu.Item key={'/login'} icon={<PieChartOutlined />} >
                    <NavLink to="/login">Login</NavLink>
                  </Menu.Item>
                </>
            }
          </Menu>
        </div>
        <Sider
          className="sidebar-desktop"
        >
          <div
            className="logo"
            style={{ background: `url(${Logo}) center no-repeat` }}
          />
          <Menu
            theme={this.state.theme}
            defaultSelectedKeys={match.path}
            mode="vertical"
            style={{ background: 'inherit' }}
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
                  <SubMenu key="sub2" icon={<TeamOutlined />} title="Profile">
                    <Menu.Item key={'/profile'} icon={<UserOutlined />} >
                      <NavLink to="/profile">Profile</NavLink>
                    </Menu.Item>
                    <Menu.Item key="signout" onClick={this.Signout} icon={<LogoutOutlined />}>
                      Sign out
                    </Menu.Item>
                  </SubMenu>
                </>
                :
                <Menu.Item key={'/login'} icon={<PieChartOutlined />} >
                  <NavLink to="/login">Login</NavLink>
                </Menu.Item>
            }
          </Menu>
        </Sider>
      </>
    )
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
