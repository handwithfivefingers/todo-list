import { Row, Space, Button, Card } from 'antd';
import React, { Component } from 'react';
import InputItem from './../../components/Layout/UI/Input';
class Login extends Component {
  state = {
    name: '',
    password: '',
  };
  render() {
    return (
      <Space>
        <Card
          title="Đăng nhập"
          extra={<a href="#">Đăng kí</a>}
          style={{ width: '400px' }}
          bordered={true}
        >
          <form className="form-group">
            <div className="input">
              <InputItem
                type="text"
                label="Email"
                value={this.state.name}
                onChange={(e) => this.setState({ name: e.target.value })}
              />
            </div>
            <div className="input">
              <InputItem
                type="password"
                label="Password"
                value={this.state.password}
                onChange={(e) => this.setState({ password: e.target.value })}
              />
            </div>
            <Button htmlType="submit" type="primary">
              Login
            </Button>
          </form>
        </Card>
      </Space>
    );
  }
}

export default Login;
