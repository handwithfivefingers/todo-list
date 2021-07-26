import { Row, Space, Button, Card, Spin } from 'antd';
import React, { Component } from 'react';
import InputItem from './../../components/Layout/UI/Input';
import { Link, Redirect } from 'react-router-dom';
import { bindActionCreators, compose } from 'redux';
import { AuthAction } from './../../actions';
import { connect } from 'react-redux';
class Register extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    Submitting: false,
  };
  handleRegister = (e) => {
    e.preventDefault();
    this.setState({
      Submitting: true,
    });
    const { firstName, lastName, email, password } = this.state;
    const { AuthActionCreator } = this.props;
    const { RegisterUser } = AuthActionCreator;
    const form = new FormData();
    form.append('firstName', firstName);
    form.append('lastName', lastName);
    form.append('email', email);
    form.append('password', password);
    setTimeout(() => {
      RegisterUser(form);
      this.setState({
        Submitting: false,
      });
    }, 1000);
  };
  render() {
    const { authReducer } = this.props;
    const { Submitting, email, firstName, lastName } = this.state;
    if (authReducer.authenticate) {
      return <Redirect to="/" />;
    }
    return (
      <Space>
        <Card
          title="Đăng kí"
          extra={<Link to="/login">Đăng Nhập</Link>}
          style={{ width: '100%' }}
          bordered={true}
        >
          <form className="form-group" onSubmit={this.handleRegister}>
            <div className="input">
              <InputItem
                type="text"
                label="First Name"
                value={this.state.firstName}
                onChange={(e) => this.setState({ firstName: e.target.value })}
              />
            </div>
            <div className="input">
              <InputItem
                type="text"
                label="Last Name"
                value={this.state.lastName}
                onChange={(e) => this.setState({ lastName: e.target.value })}
              />
            </div>
            <div className="input">
              <InputItem
                type="email"
                label="Email"
                value={this.state.email}
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
                  disabled={Submitting || email === ""  || firstName === "" || lastName === ''}
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

export default compose(withConnect)(Register);
