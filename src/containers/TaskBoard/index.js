import { EnterOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Row, Space, Spin } from 'antd';
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
        <Space className="search-layout" size="large" style={{ width: '100%', justifyContent: 'space-between' }}>
          <Button
            type="primary"
            onClick={() => this.props.history.goBack()}
          >
            <EnterOutlined /> Back
          </Button>
          <SearchItem projectId={location.state !== null && location.state !== undefined ? location.state.projectId : 'Error'} />
          <div className="avatar">
            <Avatar icon={<UserOutlined />} /> {authReducer?.user?.fullName || 'Unauthorization'}
          </div>
        </Space>
        <Spin spinning={taskReducer.loading}>
          <Row gutter={[16, 24]} style={{ marginTop: '20px' }}>
            {this.renderTaskBoard()}
            {/* <DailyReport
              label="Generate Report"
              projectId={location.state !== null && location.state !== undefined ? location.state.projectId : 'Error'}
            /> */}
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
