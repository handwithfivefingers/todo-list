import React, { Component } from 'react';
import CardItem from './../Layout/UI/Card';
import { Col, Skeleton } from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
class TaskItem extends Component {
  state = {
    taskCheckedId: []
  }
  generateReportState = (item) => {
    // console.log(item)
    // const id = item._id;
    // let index = -1;
    // index = this.state.taskCheckedId.findIndex(
    //   (arr) => arr === id
    // );
    // let returnTask = [];
    // console.log(index);
    // if (index !== -1) { // Tìm được ID
    //   this.setState({
    //     taskCheckedId: [...this.state.taskCheckedId.slice(0, index), ...this.state.taskCheckedId.slice(index + 1)]
    //   })
    // } else { // Không tìm được ID
    //   console.log('khong tim dc, +1')
    //   this.setState({
    //     taskCheckedId: [...this.state.taskCheckedId, id]
    //   })
    // }
  }
  render() {
    const { task } = this.props;
    return (
      <CardItem task={task} onClick={this.generateReportState} />
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
