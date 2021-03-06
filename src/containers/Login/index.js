import { Button, Card, Form, Input, Space, Spin } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { bindActionCreators, compose } from 'redux';
import { AuthAction } from './../../actions';

class Login extends Component {
  state = {
    submitting: false,
  };
  onFinish = (val) => {
    this.setState({
      submitting: true,
    });
    const { AuthActionCreator } = this.props;
    const { LoginUser } = AuthActionCreator;
    LoginUser(val).finally(() => {
      this.setState({
        submitting: false,
      })
    })
  }
  render() {
    const { authReducer } = this.props;
    if (authReducer.authenticate) {
      return <Redirect to="/" />;
    }
    return (
      <Space>
        <Card
          title="Đăng nhập"
          extra={<Link to="/register">Đăng kí</Link>}
          bordered={true}
          style={{ width: 350 }}
        >
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
            labelCol={{ span: 6 }}
          >

            <Form.Item name="email" rules={[{ required: true, message: 'Vui lòng nhập email !' }]}>
              <Input type="email" placeholder="Email" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu !' }]}>
              <Input.Password placeholder="Mật khẩu" />
            </Form.Item>
            <Form.Item>
              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={authReducer.authenticating}
                >
                  Submit
                </Button>
              </Space>
            </Form.Item>


          </Form>
        </Card>
      </Space>
    );
  }
}
const mapStatetoProps = (state) => ({
  authReducer: state.authReducer,
});
const mapDispatchtoProps = (dispatch) => ({
  AuthActionCreator: bindActionCreators(AuthAction, dispatch),
});

const withConnect = connect(mapStatetoProps, mapDispatchtoProps);

export default compose(withConnect)(Login);
