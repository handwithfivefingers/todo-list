import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Form, Card, Row, Col, Button, Badge, Avatar, Space, Input } from 'antd';
const Profile = () => {
  const authReducer = useSelector(state => state.authReducer);
  const user = authReducer.user ? authReducer.user : '';
  const formRef = useRef();
  useEffect(() => {
    formRef.current.setFieldsValue({
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      role: user?.role,
    })
  }, [])
  const onFinish = (val) => {
    console.log(val)
  }
  return (
    <Row gutter={[16, 12]} justify="start">
      <Col span={24}>
        <Space size="large" style={{float:'left'}}>
          <Badge count={5}>
            <Avatar shape="square" size="large" />
          </Badge>
          <Badge count={0} showZero>
            <Avatar shape="square" size="large" />
          </Badge>
        </Space>
      </Col>
      <Col span={24}>
        <Form onFinish={onFinish} ref={formRef} labelCol={{ span: 8 }}>
          <Row gutter={[16, 12]}>
            <Col span={6} gutter={[16, 12]}>
              <Card title={`Thông tin cơ bản`}>
                <Form.Item label="First Name" name="firstName">
                  <Input readOnly style={{ border: 'none' }} />
                </Form.Item>
                <Form.Item label="Last Name" name="lastName">
                  <Input readOnly style={{ border: 'none' }} />
                </Form.Item>
                <Form.Item label="Email" name="email">
                  <Input readOnly style={{ border: 'none' }} />
                </Form.Item>
                <Form.Item label="Role" name="role">
                  <Input readOnly style={{ border: 'none' }} />
                </Form.Item>
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
                <p>Những dự án hiện đang tham gia ....</p>
                <ul style={{ listStyle: 'none', textAlign: 'left' }}>
                  <li>First Name: <span> {user.firstName}</span></li>
                  <li>Last Name: <span> {user.lastName}</span></li>
                  <li>Your Email: <span> {user.email}</span></li>
                  <li>Your Role: <span> {user.role}</span></li>
                </ul>
              </Card>
            </Col>
          </Row>
        </Form>
      </Col>


    </Row>
  );
}

export default Profile;


