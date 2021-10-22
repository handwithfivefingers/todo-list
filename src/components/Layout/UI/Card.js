import {
  CalendarOutlined, EditOutlined, RestOutlined, SettingOutlined
} from '@ant-design/icons';
import {
  Avatar, Col, message, Popconfirm, Popover, Row, Skeleton, Progress, Space, Alert, Spin
} from 'antd';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { ModalAction } from '../../../actions';
import { TaskAction } from './../../../actions';

class CardItem extends Component {
  constructor(props) {
    super(props);
    this.wrapperRef = React.createRef();
    this.state = {
      dropdown: false,
      active: false,
    };
  }

  componentDidMount() {
    // document.addEventListener('mousedown', this.handleClickOutside);
  }

  // componentWillUnmount() {
  //   document.removeEventListener('mousedown', this.handleClickOutside);
  // }
  handleClickOutside = (event) => {
    const domNode = ReactDOM.findDOMNode(this);
    if (!domNode || !domNode.contains(event.target)) {
      this.setState({
        active: false,
      });
    }
  };
  handleOnclick = (task) => {
    const { TaskActionCreator, ModalActionCreator } = this.props;
    const { Task_Editing } = TaskActionCreator;
    const { ShowModal } = ModalActionCreator;
    Task_Editing(task);
    ShowModal({ title: `Edit Task` });
  };
  handleDeleteTask = (task) => {
    const { TaskActionCreator } = this.props;
    const { Delete_Task } = TaskActionCreator;
    Delete_Task(task);
    message.success('Đã xóa Task');
  };
  handleDropdownMenu = (val) => {
    this.setState({
      dropdown: val,
    });
  };
  handleSetting = (val) => {
    this.setState({
      active: val,
    });
  };
  render() {
    const { task, authReducer, taskReducer } = this.props;
    return (
      <div className="todo-card-ui" onClick={() => this.props.onClick(task)} active={this.props.active}>
        <Row gutter={6} style={{ maxWidth: '100%', padding: 10 }}>
          <Col span={24} style={{ textAlign: 'left' }}>
            <Space align="start" style={{ columnGap: 4 }}>
              <Avatar size="small" style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>{authReducer.user ? authReducer.user.firstName.substring(0, 1) : 'U'}</Avatar>
              <h3 className="title">{task.name}</h3>
            </Space>
          </Col>
          <Col span={24}>
            <p className="desc">{task.desc}</p>
          </Col>
          <Col span={24}>
            <Progress percent={task.progress} size="small" status={task.progress === 100 ? 'success' : 'active'} />
          </Col>
          {task.issue ? <Alert style={{ padding: 5, textAlign: 'left', width: '100%', alignItems: 'center' }} message="Issue:" description={task.issue} showIcon type="error" /> : ''}
        </Row>
        <div className="footer">
          <div className="action-button">
            <Popover content="Setting" trigger="hover">
              <SettingOutlined
                key="setting"
                onClick={() => this.handleSetting(!this.state.active)}
              />
            </Popover>
            <Popover content="Edit Task" trigger="hover">
              <EditOutlined
                key="edit"
                onClick={() => this.handleOnclick(task)}
              />
            </Popover>
            <Popover content="Task over" trigger="hover">
              <CalendarOutlined
                key="calendar"
                onClick={() => this.handleDropdownMenu(!this.state.dropdown)}
              />
            </Popover>
            <Popover content="Delete Task" trigger="hover">
              <Popconfirm
                title="Bạn có chắc muốn xóa task này ?"
                onConfirm={(e) => this.handleDeleteTask(task)}
                // onCancel={cancel}
                okText="Xóa"
                cancelText="Không"
              >
                <RestOutlined key="restout" />
              </Popconfirm>
            </Popover>
          </div>
        </div>
      </div>
      // </Spin>
    );
  }
}
const mapStatetoProps = (state) => ({
  taskReducer: state.taskReducer,
  authReducer: state.authReducer
});
const mapDispatchToProps = (dispatch) => ({
  TaskActionCreator: bindActionCreators(TaskAction, dispatch),
  ModalActionCreator: bindActionCreators(ModalAction, dispatch),
});
const withConnect = connect(mapStatetoProps, mapDispatchToProps);
export default compose(withConnect)(CardItem);
