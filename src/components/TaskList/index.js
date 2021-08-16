import { Button, Col, Skeleton } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import TaskItem from '../TaskItem';
import { ModalAction } from './../../actions';
// import ModalForm from '../Layout/UI/ModalForm';
class TaskList extends Component {

  renderCardItem = () => {
    let xhtml = null;
    const { task, projectId } = this.props;
    // console.log(task, projectId);
    const newTask = task?.filter(item => item.project === projectId);
    xhtml = newTask?.map((item) => {
      return <TaskItem key={item._id} task={item} />;
    });
    return xhtml;
  };

  renderModalAddNew = () => {
    const { ModalActionCreator, projectId } = this.props;
    const { ShowModal } = ModalActionCreator;
    ShowModal({ title: `Add New Task`, projectId });
  };
  /** Fix here *
   * Need call Modal to global, not local like this
   */

  handleCancel = () => {
    const { ModalActionCreator } = this.props;
    const { HideModal } = ModalActionCreator;
    HideModal();
  };

  render() {
    const { label, taskReducer } = this.props;
    return (

      <Col className="gutter-row task-background" xs={24} sm={12} md={8} lg={8} xl={6}>
          <div className="task-background-component">
            <h2>{label}</h2>
            {this.renderCardItem()}
            <Button className="task-btn" onClick={() => this.renderModalAddNew()}>
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
