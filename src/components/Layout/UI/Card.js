import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  RestOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import { Avatar, Card, Menu, Skeleton, Dropdown, Button, Popover } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { ModalAction } from '../../../actions';
import { TaskAction } from './../../../actions';
import ReactDOM from 'react-dom';
import { Delete_Task } from '../../../actions/task';
const { Meta } = Card;

class CardItem extends Component {
  constructor(props) {
    super(props);
    this.wrapperRef = React.createRef();
    this.state = {
      dropdown: false,
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
        dropdown: false,
      });
    }
  };

  handleOnclick = (task) => {
    const { TaskActionCreator, ModalActionCreator } = this.props;
    const { Task_Editing } = TaskActionCreator;
    const { ShowModal } = ModalActionCreator;
    Task_Editing(task);
    ShowModal(`Edit Task`);
  };
  handleDeleteTask = (task) => {
    console.log(task);
    const { TaskActionCreator } = this.props;
    const { Delete_Task } = TaskActionCreator;
    Delete_Task(task);
  };
  handleDropdownMenu = (val) => {
    console.log(val);
    this.setState({
      dropdown: val,
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
            <SettingOutlined key="setting" />
            <EditOutlined key="edit" onClick={() => this.handleOnclick(task)} />
            <CalendarOutlined
              key="calendar"
              onClick={() => this.handleDropdownMenu(!this.state.dropdown)}
            />
            <RestOutlined
              key="restout"
              onClick={() => this.handleDeleteTask(task)}
            />
            <EllipsisOutlined
              key="ellipsis"
              onClick={() => this.handleDropdownMenu(!this.state.dropdown)}
            />
          </div>
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
