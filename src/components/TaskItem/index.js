import React, { Component } from 'react';
import CardItem from './../Layout/UI/Card';
import { Col, Skeleton } from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
class TaskItem extends Component {
  // state = {
  //   loading: true,
  // };
  // componentDidMount() {
  //   const { task } = this.props;
  //   if (task && task !== undefined) {
  //     this.CardSkeleton(false);
  //   } else {
  //     this.CardSkeleton(true);
  //   }
  // }

  // CardSkeleton = (val) => {
  //   setTimeout(() => {
  //     this.setState({ loading: val })
  //   }, 1000)
  // }

  // renderCardItem = () => {
  //   const { task } = this.props;
  //   let xhtml = null;
  //   if (task !== null && task !== undefined) {

  //   }
  //   return xhtml;
  // }
  render() {
    const { task, taskReducer } = this.props;
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
