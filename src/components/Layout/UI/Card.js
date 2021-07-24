import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  RestOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Card,
  Menu,
  Skeleton,
  Dropdown,
  Button,
  Popover,
  Popconfirm,
  message,
} from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { ModalAction } from '../../../actions';
import { TaskAction } from './../../../actions';
import ReactDOM from 'react-dom';


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
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }
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
    console.log(val);
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
    const { task } = this.props;
    return (
      <div className="todo-card-ui">
        <div className="body">
          <div className="avatar">
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          </div>
          <div className="content">
            <h3 className="title">{task.name}</h3>
            <p className="desc">{task.desc}</p>
          </div>
        </div>
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
            {/* <Popover content="Delete Task" trigger="hover">
              <RestOutlined
                key="restout"
                onClick={() => this.handleDeleteTask(task)}
              />
            </Popover> */}
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

            {/* <Popover content="Something else" trigger="hover">
              <EllipsisOutlined
                key="ellipsis"
                onClick={() => this.handleDropdownMenu(!this.state.dropdown)}
              />
            </Popover> */}
          </div>
        </div>
        <div
          className={`popup-action ${this.state.active ? 'popup-active' : ''}`}
        >
          <ul>
            <li>
              <a> Color Picker</a>
            </li>
            <li>
              <a> Tag Flag</a>
            </li>
            <li>
              <a> Tag User</a>
            </li>
            <li>
              <a> ...</a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
const mapStatetoProps = (state) => ({
  taskReducer: state.taskReducer,
});
const mapDispatchToProps = (dispatch) => ({
  TaskActionCreator: bindActionCreators(TaskAction, dispatch),
  ModalActionCreator: bindActionCreators(ModalAction, dispatch),
});
const withConnect = connect(mapStatetoProps, mapDispatchToProps);
export default compose(withConnect)(CardItem);
