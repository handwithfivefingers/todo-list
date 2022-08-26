import { Button, Card, Form, Input, Space, Spin } from 'antd';
import React, { Component, useContext, useEffect, useState } from 'react';
import { Link, Redirect, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../helper/context/AuthContext';
import AuthenticateService from '../../service/authenticate.service';

const Login = () => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  const { auth, setAuth } = useContext(AuthContext);

  let navigate = useNavigate();

  const onFinish = async (val) => {
    try {
      let res = await AuthenticateService.Login(val);
      if (res.status === 200) {
        setAuth(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  
  useEffect(() => {
    auth && navigate('/');
  }, [auth]);

  return (
    <Space>
      <Card
        title="Đăng nhập"
        extra={<Link to="/register">Đăng kí</Link>}
        bordered={true}
        style={{ width: 350 }}
      >
        <Form form={form} onFinish={onFinish} labelCol={{ span: 6 }}>
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Vui lòng nhập email !' }]}
          >
            <Input type="email" placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu !' }]}
          >
            <Input.Password placeholder="Mật khẩu" />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" disabled={loading}>
                Submit
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </Space>
  );
};

export default Login;
