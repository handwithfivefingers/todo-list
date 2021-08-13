import { EnterOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Row } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import ModalForm from '../../components/Layout/UI/Modal/ModalForm';
import SearchItem from '../../components/Search';
import { ModalAction, TaskAction } from './../../actions';
import DailyReport from './../../components/DailyReport';
import TaskList from './../../components/TaskList';
import { TASK_STATUS } from './../../constant/task';
class TaskBoard extends Component {

  renderTaskBoard = () => {
    let xhtml = null;
    const { taskReducer, location } = this.props;
    if (location.state !== null && location.state !== undefined) {
      xhtml = TASK_STATUS.map((status, index) => {
        const task = taskReducer.tasks?.filter(
          (item) => parseInt(item.status) === status.value
        );
        return (
          <TaskList
            key={status._id}
            task={task}
            label={status.label}
            projectId={location.state.projectId}
          />
        );
      });
    }
    return xhtml;
  };

  render() {
    const { location } = this.props;
    // console.log('location', this.props.location);
    return (
      <>
        <Row gutter={[16, 24]} align="middle">
          <Col span={4}>
            <Button
              type="link"
              onClick={() => this.props.history.goBack()}
            >
              <EnterOutlined /> Back
            </Button>
          </Col>
          <Col span={16}>
            <SearchItem projectId={location.state !== null && location.state !== undefined ? location.state.projectId : 'Error'} />
          </Col>
          <Col span={4}>
            <Avatar icon={<UserOutlined />} />
            <Avatar icon={<UserOutlined />} />
            <Avatar icon={<UserOutlined />} />
            <Avatar icon={<UserOutlined />} />
          </Col>
        </Row>
        <Row gutter={[16, 24]}>
          {this.renderTaskBoard()}
          <DailyReport
            label="Generate Report"
            projectId={location.state !== null && location.state !== undefined ? location.state.projectId : 'Error'}
          />
        </Row>
        <ModalForm />
      </>
    );
  }
}

const mapStatetoProps = (state) => ({
  taskReducer: state.taskReducer,
});
const mapDispatchToProps = (dispatch) => ({
  TaskListAction: bindActionCreators(TaskAction, dispatch),
  ModalListAction: bindActionCreators(ModalAction, dispatch),
});
const withConnect = connect(mapStatetoProps, mapDispatchToProps);
export default compose(withConnect)(TaskBoard);
