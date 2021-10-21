import { EnterOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Row, Spin } from 'antd';
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
            stt={{ label: status.label, value: status.value }}
            counting={task?.length}
            projectId={location.state.projectId}
          />
        );
      });
    }
    return xhtml;
  };

  render() {
    const { location, taskReducer, authReducer } = this.props;
    // console.log('location', this.props.location);
    return (
      <>
        <Row gutter={[16, 24]} align="left">
          <Col xs={6} sm={4} md={4} lg={4}>
            <Button
              type="primary"
              onClick={() => this.props.history.goBack()}
            >
              <EnterOutlined /> Back
            </Button>
          </Col>
          <Col xs={18} sm={12} md={12} lg={16}>
            <SearchItem projectId={location.state !== null && location.state !== undefined ? location.state.projectId : 'Error'} />
          </Col>
          <Col xs={24} sm={8} md={8} lg={4}>
            <Avatar icon={<UserOutlined />} /> {authReducer?.user?.fullName || 'Unauthorization'}
          </Col>

        </Row>
        <Spin spinning={taskReducer.loading}>
          <Row gutter={[16, 24]}>
            {this.renderTaskBoard()}
            <DailyReport
              label="Generate Report"
              projectId={location.state !== null && location.state !== undefined ? location.state.projectId : 'Error'}
            />
          </Row>
        </Spin>
        <ModalForm />

      </>
    );
  }
}

const mapStatetoProps = (state) => ({
  taskReducer: state.taskReducer,
  authReducer: state.authReducer
});
const mapDispatchToProps = (dispatch) => ({
  TaskListAction: bindActionCreators(TaskAction, dispatch),
  ModalListAction: bindActionCreators(ModalAction, dispatch),
});
const withConnect = connect(mapStatetoProps, mapDispatchToProps);
export default compose(withConnect)(TaskBoard);
