import React, { Component } from 'react';
import TaskList from './../../components/TaskList';
import { Row, Col, Menu, Dropdown, Button, Avatar } from 'antd';
import { TASK_STATUS } from './../../constant/task';
import SearchItem from '../../components/Search';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { TaskAction, ModalAction } from './../../actions';
import { UserOutlined } from '@ant-design/icons';
import ModalForm from '../../components/Layout/UI/ModalForm';

class Task extends Component {
  // constructor(props) {
  //   this.ShowModalForm = this.ShowModalForm.bind(this);
  // }
  state = {
    search: '',
  };

  handleCancel = () => {
    const { ModalListAction } = this.props;
    const { HideModal } = ModalListAction;
    HideModal();
  };
  handleSave = () => {
    const { ModalListAction } = this.props;
    const { ShowModal } = ModalListAction;
    ShowModal();
  };
  onFinish = (e) => {
    console.log(e);
  };
  ShowModalForm = () => {
    let xhtml = null;
    xhtml = <ModalForm />;
    return xhtml;
  };

  handleEdit = (e) => {
    console.log(e);
  };
  renderTaskBoard = () => {
    let xhtml = null;
    const { taskReducer } = this.props;
    xhtml = TASK_STATUS.map((status) => {
      const task = taskReducer.tasks.filter(
        (item) => parseInt(item.status) === status.value
      );
      return (
        <TaskList
          task={task}
          key={status.value}
          label={status.label}
          handleEdit={this.handleEdit}
        />
      );
    });
    return xhtml;
  };
  componentDidMount() {
    const { TaskListAction } = this.props;
    const { fetchListTask } = TaskListAction;
    fetchListTask();
  }
  render() {
    const { taskReducer } = this.props;
    return (
      <>
        <Row gutter={[16, 24]}>
          <Col span={8}>
            <SearchItem />
          </Col>
          <Col span={8}>
            <Avatar icon={<UserOutlined />} />
            <Avatar icon={<UserOutlined />} />
            <Avatar icon={<UserOutlined />} />
            <Avatar icon={<UserOutlined />} />
          </Col>
        </Row>
        <Row gutter={[16, 24]}>
          {taskReducer.tasks.length > 0 ? this.renderTaskBoard() : ''}
        </Row>
        {this.ShowModalForm()}
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
export default compose(withConnect)(Task);
