import { Button, Col, Skeleton, Spin, Select, message } from 'antd';
import { debounce } from 'lodash';
import React, {
  Component,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import TaskService from '../../service/task.service';
import TaskItem from '../TaskItem';

// import ModalForm from '../Layout/UI/ModalForm';
// class TaskList extends Component {
//   renderCardItem = (filterTask = null) => {
//     let xhtml = null;
//     if (filterTask !== null) {
//       xhtml = filterTask.map((item) => {
//         return <TaskItem key={item._id} task={item} />
//       });
//     } else {
//       const { task, projectId } = this.props;
//       const newTask = task?.filter(item => item.project === projectId);
//       xhtml = newTask?.map((item) => {
//         return <TaskItem key={item._id} task={item} />
//       });
//     }
//     return xhtml;
//   };

//   renderModalAddNew = (val) => {
//     console.log(val);
//     const { ModalActionCreator, projectId } = this.props;
//     const { ShowModal } = ModalActionCreator;
//     ShowModal({ title: `Add New Task`, projectId });
//   };
//   handleCancel = () => {
//     const { ModalActionCreator } = this.props;
//     const { HideModal } = ModalActionCreator;
//     HideModal();
//   };

//   render() {
//     const { stt } = this.props;
//     return (

//       <Col className="gutter-row task-background" xs={24} sm={12} md={8} lg={8} xl={6}>
//         <div className="task-background-component scrollbar">
//           <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//             <h2>{stt.label}</h2>
//             <span>{this.props.counting}</span>
//           </div>
//           {this.renderCardItem()}
//           <Button className="task-btn" onClick={() => this.renderModalAddNew(stt.value)}>
//             Add new
//           </Button>
//         </div>
//       </Col>

//     );
//   }
// }
// const mapStatetoProps = (state) => ({
//   taskReducer: state.taskReducer,
// });
// const mapDispatchToProps = (dispatch) => ({
//   ModalActionCreator: bindActionCreators(ModalAction, dispatch),
// });
// const withConnect = connect(mapStatetoProps, mapDispatchToProps);

const TaskList = (props) => {
  const { stt, counting, onDragEvent } = props;

  const onDragStart = (e, item) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text', JSON.stringify(item));
  };

  const onDragOver = (event) => {
    event.preventDefault();
  };

  const onHandleDrop = (event, stt) => {
    event.preventDefault();
    let item = JSON.parse(event.dataTransfer.getData('text'));
    if (!item) return;
    if (item.status === stt.value) return;
    onDragEvent(item._id, stt.value);
  };

  const renderCardItem = useMemo(() => {
    return (
      props?.task &&
      props?.task?.map((item, index) => (
        <TaskItem
          key={index}
          task={item || null}
          index={index}
          onDragStart={onDragStart}
        />
      ))
    );
  }, [props?.task]);

  return (
    <Col
      className="gutter-row task-background"
      xs={24}
      sm={12}
      md={8}
      lg={8}
      xl={6}
    >
      <div
        className="task-background-component scrollbar"
        onDrop={(ev) => onHandleDrop(ev, stt)}
        onDragOver={onDragOver}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h2>{stt.label}</h2>
          <span>{counting}</span>
        </div>
        {renderCardItem}
        <Button
          className="task-btn"
          // onClick={() => this.renderModalAddNew(stt.value)}
        >
          Add new
        </Button>
      </div>
    </Col>
  );
};
export default TaskList;
