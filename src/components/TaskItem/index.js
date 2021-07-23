import React, { Component } from 'react';
import CardItem from './../Layout/UI/Card';
import { Col } from 'antd';
class TaskItem extends Component {
  render() {
    const { task } = this.props;
    return <CardItem task={task}/>;
  }
}

export default TaskItem;
