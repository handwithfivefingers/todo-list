import React, { Component } from 'react';
import { Col, Button, Tooltip } from 'antd';
import TaskItem from '../TaskItem';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { ModalAction } from './../../actions';
import ModalForm from '../Layout/UI/ModalForm';
class TaskList extends Component {
  renderCardItem = () => {
    let xhtml = [];
    const { task } = this.props;
    xhtml = task.map((item) => {
      return <TaskItem task={item} key={item.id} />;
    });
    return xhtml;
  };
  renderModalAddNew = () => {
    const { ModalActionCreator } = this.props;
    const { ShowModal } = ModalActionCreator;
    ShowModal(`Add New Task`);
  };
  /** Fix here *
   * Need call Modal to global, not local like this
   */

  handleCancel = () => {
    const { ModalActionCreator } = this.props;
    const { HideModal } = ModalActionCreator;
    HideModal();
  };

  handleSave = (val) => {
    console.log(val);
  };
  onFinish = (val) => {
    console.log(val);
  };
  render() {
    const { label } = this.props;
    return (
      <Col className="gutter-row task-background" span={6}>
        <div className="task-background-component">
          <h2>{label}</h2>
          {this.renderCardItem()}
            <Button
              className="task-btn"
              onClick={() => this.renderModalAddNew()}
            >
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
