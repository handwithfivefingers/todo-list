import React from 'react';
import { useSelector } from 'react-redux';
import { Card, Row, Col, Button, Badge, Avatar, Space } from 'antd';
const Profile = () => {
  const authReducer = useSelector(state => state.authReducer);
  const user = authReducer.user ? authReducer.user : '';
  return (
    <Row gutter={[6, 6]} justify="start">
      <Space size="large">
        <Badge count={5}>
          <Avatar shape="square" size="large" />
        </Badge>
        <Badge count={0} showZero>
          <Avatar shape="square" size="large" />
        </Badge>
      </Space>
      <Col span={24}>
        <Row gutter={[8,8]}>
          <Col span={6}>
            <Card title={`Hello, ${authReducer.user ? authReducer.user.fullName : ''}`}>
              <ul style={{ listStyle: 'none', textAlign: 'left' }}>
                <li>First Name: <span> {user.firstName}</span></li>
                <li>Last Name: <span> {user.lastName}</span></li>
                <li>Your Email: <span> {user.email}</span></li>
                <li>Your Role: <span> {user.role}</span></li>
              </ul>
            </Card>
            <Card title={`Hello, ${authReducer.user ? authReducer.user.fullName : ''}`}>
              <ul style={{ listStyle: 'none', textAlign: 'left' }}>
                <li>First Name: <span> {user.firstName}</span></li>
                <li>Last Name: <span> {user.lastName}</span></li>
                <li>Your Email: <span> {user.email}</span></li>
                <li>Your Role: <span> {user.role}</span></li>
              </ul>
            </Card>
            <Card title={`Hello, ${authReducer.user ? authReducer.user.fullName : ''}`}>
              <ul style={{ listStyle: 'none', textAlign: 'left' }}>
                <li>First Name: <span> {user.firstName}</span></li>
                <li>Last Name: <span> {user.lastName}</span></li>
                <li>Your Email: <span> {user.email}</span></li>
                <li>Your Role: <span> {user.role}</span></li>
              </ul>
            </Card>
          </Col>

          <Col span={18}>
            <Card title={`Hello, ${authReducer.user ? authReducer.user.fullName : ''}`}>
              <ul style={{ listStyle: 'none', textAlign: 'left' }}>
                <li>First Name: <span> {user.firstName}</span></li>
                <li>Last Name: <span> {user.lastName}</span></li>
                <li>Your Email: <span> {user.email}</span></li>
                <li>Your Role: <span> {user.role}</span></li>
              </ul>
            </Card>
          </Col>
        </Row>
      </Col>


    </Row>
  );
}

export default Profile;


