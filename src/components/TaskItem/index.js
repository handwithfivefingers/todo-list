import React, { Component } from 'react';
import CardItem from './../Layout/UI/Card';
import { Col, Skeleton } from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
class TaskItem extends Component {
  render() {
    const { task } = this.props;
    return (
      <CardItem task={task} />
    );
  }
}
const mapStatetoProps = state => {
  return {
    taskReducer: state.taskReducer
  }
}
const mapDispatchToProps = null;
const withConnect = connect(mapStatetoProps, mapDispatchToProps)
export default compose(withConnect)(TaskItem);
