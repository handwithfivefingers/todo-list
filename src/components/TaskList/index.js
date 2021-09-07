import { Button, Col, Skeleton, Spin, Select } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import TaskItem from '../TaskItem';
import { ModalAction } from './../../actions';

// import ModalForm from '../Layout/UI/ModalForm';
class TaskList extends Component {
  renderCardItem = (filterTask = null) => {
    let xhtml = null;
    if (filterTask !== null) {
      xhtml = filterTask.map((item) => {
        return <TaskItem key={item._id} task={item} />
      });
    } else {
      const { task, projectId } = this.props;
      const newTask = task?.filter(item => item.project === projectId);
      xhtml = newTask?.map((item) => {
        return <TaskItem key={item._id} task={item} />
      });
    }
    return xhtml;
  };

  renderModalAddNew = (val) => {
    console.log(val);
    const { ModalActionCreator, projectId } = this.props;
    const { ShowModal } = ModalActionCreator;
    ShowModal({ title: `Add New Task`, projectId });
  };
  handleCancel = () => {
    const { ModalActionCreator } = this.props;
    const { HideModal } = ModalActionCreator;
    HideModal();
  };

  render() {
    const { stt } = this.props;
    return (

      <Col className="gutter-row task-background" xs={24} sm={12} md={8} lg={8} xl={6}>
        <div className="task-background-component">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h2>{stt.label}</h2>
            <span>{this.props.counting}</span>
          </div>
          {this.renderCardItem()}
          <Button className="task-btn" onClick={() => this.renderModalAddNew(stt.value)}>
            Add new
          </Button>
        </div>

      </Col>

    );
  }
}
const mapStatetoProps = (state) => ({
  taskReducer: state.taskReducer,
});
const mapDispatchToProps = (dispatch) => ({
  ModalActionCreator: bindActionCreators(ModalAction, dispatch),
});
const withConnect = connect(mapStatetoProps, mapDispatchToProps);

export default compose(withConnect)(TaskList);
