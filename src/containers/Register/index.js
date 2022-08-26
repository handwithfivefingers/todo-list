import { Button, Card, Form, Input, Space, Spin } from 'antd';
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

// class Register extends Component {
//   state = {
//     submitting: false,
//   };

//   onFinish = (val) => {
//     this.setState({
//       submitting: true,
//     });
//     const { AuthActionCreator } = this.props;
//     const { RegisterUser } = AuthActionCreator;
//     setTimeout(() => {
//       RegisterUser(val);
//       this.setState({
//         submitting: false,
//       });
//     }, 1000);
//   }
//   render() {
//     const { authReducer } = this.props;
//     const { submitting } = this.state;
//     if (authReducer.authenticate) {
//       return <Redirect to="/" />;
//     }
//     return (
//       <Space>
//         <Card
//           title="Đăng kí"
//           extra={<Link to="/login">Đăng Nhập</Link>}
//           style={{ width: '100%' }}
//           bordered={true}
//         >
//           <Form ref={this.formRef} onFinish={this.onFinish}>
//             <Space>
//               <Form.Item name="firstName" rules={[{ required: true, message: 'First name is required!' }]}>
//                 <Input placeholder="First Name" />
//               </Form.Item>
//               <Form.Item name="lastName" rules={[{ required: true, message: 'Last name is required!' }]}>
//                 <Input placeholder="Last Name" />
//               </Form.Item>
//             </Space>

//             <Form.Item name="email" rules={[{ required: true, message: 'Email is required!' }]}>
//               <Input type="email" placeholder="Email" />
//             </Form.Item>

//             <Form.Item name="password" rules={[{ required: true, message: 'Password is required!' }]}>
//               <Input.Password placeholder="Password" />
//             </Form.Item>
//             <Form.Item>
//               <Spin spinning={submitting}>
//                 <Button type="primary" htmlType="submit" disabled={submitting}>
//                   Register
//                 </Button>
//               </Spin>
//             </Form.Item>

//           </Form>
//         </Card>
//       </Space>
//     );
//   }
// }
// const mapStatetoProps = (state) => ({
//   authReducer: state.authReducer,
// });
// const mapDispatchtoProps = (dispatch) => ({
//   AuthActionCreator: bindActionCreators(AuthAction, dispatch),
// });

// const withConnect = connect(mapStatetoProps, mapDispatchtoProps);

const Register = () => {
  return <></>;
};
export default Register;
