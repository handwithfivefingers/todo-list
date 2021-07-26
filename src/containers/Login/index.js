import { Row, Space, Button, Card, Spin } from 'antd';
import React, { Component } from 'react';
import InputItem from './../../components/Layout/UI/Input';
import { Link, Redirect } from 'react-router-dom';
import { bindActionCreators, compose } from 'redux';
import { AuthAction } from './../../actions';
import { connect } from 'react-redux';
class Login extends Component {
  state = {
    email: '',
    password: '',
    Submitting: false,
  };
  handleLogin = (e) => {
    e.preventDefault();
    this.setState({
      Submitting: true,
    });
    const { AuthActionCreator } = this.props;
    const { LoginUser } = AuthActionCreator;
    const { email, password } = this.state;
    const form = new FormData();
    form.append('email', email);
    form.append('password', password);
    setTimeout(() => {
      LoginUser(form);
      this.setState({
        Submitting: false,
      });
    }, 1000);
  };
  render() {
    const { authReducer } = this.props;
    const { Submitting, email } = this.state;
    if (authReducer.authenticate) {
      return <Redirect to="/" />;
    }
    return (
      <Space>
        <Card
          title="Đăng nhập"
          extra={<Link to="/register">Đăng kí</Link>}
          style={{ width: '100%' }}
          bordered={true}
        >
          <form className="form-group" onSubmit={this.handleLogin}>
            <div className="input">
              <InputItem
                type="email"
                label="Email"
                value={this.state.name}
                onChange={(e) => this.setState({ email: e.target.value })}
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
            <Space>
              <Spin spinning={Submitting}>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={Submitting || email === ''}
                >
                  Submit
                </Button>
              </Spin>
            </Space>
          </form>
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
