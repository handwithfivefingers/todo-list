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
        <h2> Hello, {authReducer.user ? authReducer.user.fullName : ''}</h2>
        <p>Below here are contains your information</p>
      </Col>
      <Col>
        <Card title="User infomation">
          <ul>
            <li>First Name: <span> {user.firstName}</span></li>
            <li>Last Name: <span> {user.lastName}</span></li>
            <li>Your Email: <span> {user.email}</span></li>
            <li>Your Role: <span> {user.role}</span></li>
          </ul>
        </Card>
      </Col>

    </Row>
  );
}

export default Profile;


