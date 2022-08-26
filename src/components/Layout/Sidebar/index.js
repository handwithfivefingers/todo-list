import {
  FolderOutlined,
  LogoutOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

import { Layout, Menu } from 'antd';

import React, { useState } from 'react';

import { NavLink } from 'react-router-dom';

import Logo from './../../../logo.svg';

const { SubMenu } = Menu;

const { Sider } = Layout;

const SiderLayout = (props) => {
  const [state, setState] = useState({
    theme: 'dark',
  });

  // const logOut = () => {
  //   dispatch(userLogout());
  // };

  const sidebarMobile = () => {
    return (
      <div className="sidebar-mobile">
        <Menu
          theme={state.theme}
          mode="vertical"
          style={{ background: 'inherit' }}
        >
          <Menu.Item key={'/'} icon={<PieChartOutlined />}>
            <NavLink to="/">Home</NavLink>
          </Menu.Item>

          <Menu.Item key={'/project'} icon={<PieChartOutlined />}>
            <NavLink to="/project">Project</NavLink>
          </Menu.Item>

          {/* {authReducer.authenticate && authReducer.token ? (
            <>
              <Menu.Item key={'/profile'} icon={<PieChartOutlined />}>
                <NavLink to="/profile">Profile</NavLink>
              </Menu.Item>
              <Menu.Item key={'/signout'} icon={<PieChartOutlined />}>
                <a onClick={logOut}>Sign out</a>
              </Menu.Item>
            </>
          ) : (
            <>
              <Menu.Item key={'/login'} icon={<PieChartOutlined />}>
                <NavLink to="/login">Login</NavLink>
              </Menu.Item>
            </>
          )} */}
          <Menu.Item key={'/login'} icon={<PieChartOutlined />}>
            <NavLink to="/login">Login</NavLink>
          </Menu.Item>
        </Menu>
      </div>
    );
  };

  const sidebarDestop = () => {
    return (
      <Sider className="sidebar-desktop">
        <div
          className="logo"
          style={{ background: `url(${Logo}) center no-repeat` }}
        />
        <Menu
          theme={state.theme}
          // defaultSelectedKeys={match.path}
          mode="vertical"
          style={{ background: 'inherit' }}
        >
          <Menu.Item key={'/'} icon={<PieChartOutlined />}>
            <NavLink to="/">Home</NavLink>
          </Menu.Item>

          <Menu.Item key={'/project'} icon={<FolderOutlined />}>
            <NavLink to="/project">Project</NavLink>
          </Menu.Item>

          <Menu.Item key={'/login'} icon={<PieChartOutlined />}>
            <NavLink to="/login">Login</NavLink>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  };
  return (
    <>
      {sidebarMobile()}
      {sidebarDestop()}
    </>
  );
};

export default SiderLayout;
