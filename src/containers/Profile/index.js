import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Form, Card, Row, Col, Button, Badge, Avatar, Space, Input, Collapse } from 'antd';
const Profile = () => {
  const authReducer = useSelector(state => state.authReducer);
  const user = authReducer.user ? authReducer.user : '';
  const formRef = useRef();
  useEffect(() => {
    setField()
  }, [formRef])
  const setField = () => {
    formRef.current.setFieldsValue({
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      role: user?.role,
    })
  }
  const onFinish = (val) => {
    console.log(val)
  }
  const acceptInvite = () => {
    console.log('Đã chấp nhận')
  }

  return (
    <Row gutter={[16, 12]} justify="start" style={{ padding: '12px' }}>
      <Col span={24}>
        <Space size="large" style={{ float: 'right' }}>
          <Badge count={5}>
            <Avatar shape="square" size="large" />
          </Badge>
          <Badge count={0} showZero>
            <Avatar shape="square" size="large" />
          </Badge>
        </Space>
      </Col>
      <Col span={24}>
        <Form onFinish={onFinish} ref={formRef} labelCol={{ span: 8 }} layout="horizontal">
          <Row gutter={[16, 12]}>
            <Col span={6} gutter={[16, 12]} >
              <Card style={{ padding: 0 }} bodyStyle={{ padding: 0 }}>
                <Collapse accordion ghost expandIconPosition="right" onChange={() => setField()}>
                  <Collapse.Panel header={<h3 style={{ fontWeight: '500' }}>Thông tin cơ bản</h3>} key="1" showArrow={true}>
                    <Form.Item label="First Name" name="firstName" style={{ margin: 5 }}>
                      <Input readOnly style={{ border: 'none' }} />
                    </Form.Item>
                    <Form.Item label="Last Name" name="lastName" style={{ margin: 5 }}>
                      <Input readOnly style={{ border: 'none' }} />
                    </Form.Item>
                    <Form.Item label="Email" name="email" style={{ margin: 5 }}>
                      <Input readOnly style={{ border: 'none' }} />
                    </Form.Item>
                    <Form.Item label="Role" name="role" style={{ margin: 5 }}>
                      <Input readOnly style={{ border: 'none' }} />
                    </Form.Item>
                  </Collapse.Panel>
                </Collapse>

              </Card>
              <Card style={{ padding: 0 }} bodyStyle={{ padding: 0 }}>
                <Collapse accordion ghost expandIconPosition="right">
                  <Collapse.Panel header={<h3 style={{ fontWeight: '500' }}>Bảo Mật</h3>} key="21" showArrow={true}>
                    <Form.Item name="old_password" style={{ margin: 5 }}>
                      <Input.Password placeholder='Mật khẩu hiện tại' readOnly />
                    </Form.Item>
                    <Form.Item name="password" style={{ margin: 5 }}>
                      <Input.Password placeholder='Mật khẩu mới' readOnly />
                    </Form.Item>
                    <Form.Item name="confirm_password" style={{ margin: 5 }}>
                      <Input.Password placeholder='Xác thực' readOnly />
                    </Form.Item>
                  </Collapse.Panel>
                </Collapse>
              </Card>
              <Card title={`Project Request`}>
                Project Name: xxxxxx <Button type="primary" onClick={() => acceptInvite()}> Chấp Nhận</Button>
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


