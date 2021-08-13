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
    setTimeout(() => {
      LoginUser(val);
      this.setState({
        submitting: false,
      });
    }, 1000);
  }
  render() {
    const { authReducer } = this.props;
    const { submitting } = this.state;
    if (authReducer.authenticate) {
      return <Redirect to="/" />;
    }
    return (
      <Space>
        <Card
          title="Đăng nhập"
          extra={<Link to="/register">Đăng kí</Link>}
          style={{ width: '400px' }}
          bordered={true}
        >
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
            labelCol={{ span: 6 }}
          >
            <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter your email !' }]}>
              <Input type="email" />
            </Form.Item>
            <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter your password !' }]}>
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Space>
                <Spin spinning={submitting}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={submitting}
                  >
                    Submit
                  </Button>
                </Spin>
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
