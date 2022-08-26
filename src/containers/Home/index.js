import React, { Component } from 'react';
import {
  Progress,
  Row,
  Col,
  Tooltip,
  Avatar,
  Card,
  Space,
  Statistic,
  Slider,
  Spin,
  Table,
  Button,
  Input,
  Modal,
} from 'antd';



import './style.css';

class Home extends Component {
  render() {
    return <Row gutter={[16, 24]}></Row>;
  }
}
// const mapStatetoProps = (state) => ({
//   taskReducer: state.taskReducer,
// });
// const mapDispatchtoProps = null;
// const withConnect = connect(mapStatetoProps, mapDispatchtoProps);
export default Home
