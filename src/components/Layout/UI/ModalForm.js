import React, { useRef, useState, useEffect } from 'react';
import { Tooltip, Spin, Modal, Radio, Space, Button, Popover } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
// import { FormInstance } from 'antd/lib/form';
// import InputItem from './Input';
import { TASK_STATUS } from '../../../constant/task';
import { useDispatch, useSelector } from 'react-redux';
import { ModalAction } from '../../../actions';
import { EditTask, AddNewTask } from '../../../actions/task';
import { HideModal } from '../../../actions/modal';
import InputItem from './Input';

const ModalForm = (props) => {
  const [name, SetName] = useState('');
  const [desc, SetDesc] = useState('');
  const [status, SetStatus] = useState(0);
  const taskReducer = useSelector((state) => state.taskReducer);
  const [Submitting, SetSubmitting] = useState(false);
  const [validation, Setvalidation] = useState(false);
  const dispatch = useDispatch();
  const onCancel = () => {
    const { HideModal } = ModalAction;
    dispatch(HideModal());
  };
  useEffect(() => {
    if (taskReducer.showModal && taskReducer.taskediting) {
      SetName(taskReducer.taskediting.name);
      SetDesc(taskReducer.taskediting.desc);
      SetStatus(taskReducer.taskediting.status);
    } else {
      SetName('');
      SetDesc('');
      SetStatus(0);
    }
  }, [taskReducer.taskediting]);
  const validate = (params) => {
    if (params.length < 3) {
      Setvalidation(true);
      return false;
    }
    Setvalidation(false);
    return true;
  };
  const SubmitTodoForm = (e) => {
    e.preventDefault();
    if (!validate(name)) {
      return false;
    }
    const form = new FormData();
    form.append('name', name);
    form.append('desc', desc);
    form.append('status', status);
    if (taskReducer.modal.projectId) {
      form.append('project', taskReducer.modal.projectId);
    }
    // console.log('Name:', name, 'Desc: ', desc, 'Status: ', status);
    // console.log('has been sent');
    if (taskReducer.taskediting && taskReducer.taskediting._id) {
      console.log(taskReducer.taskediting._id);
      const id = taskReducer.taskediting._id;
      dispatch(EditTask({ name, desc, status, id }));
    } else {
      const project = taskReducer.modal.projectId;
      dispatch(AddNewTask({ name, desc, status, project }));
    }
    SetSubmitting((prevState) => !prevState);
    setTimeout(() => {
      SetSubmitting((prevState) => !prevState);
      dispatch(HideModal());
      Setvalidation(false);
      SetName('');
      SetDesc('');
      SetStatus(0);
    }, 1000);
  };
  const renderInput = () => {
    let xhtml = null;
    xhtml = (
      <form id="form-group" className="form-group" onSubmit={SubmitTodoForm}>
        <div className="input">
          <InputItem
            type="text"
            label="Name"
            // value={name}
            value={name}
            onChange={(e) => SetName(e.target.value)}
          />
        </div>
        <InputItem
          type="validate"
          validation={validation}
          content=" Title must have 4 character minimum !"
        />
        <div className="input">
          <InputItem
            type="text"
            label="Desc"
            // value={desc}
            value={desc}
            onChange={(e) => SetDesc(e.target.value)}
          />
        </div>
        <div className="input">
          <InputItem
            type="select"
            label="Status"
            // value={status}
            value={status}
            onChange={(e) => SetStatus(e.target.value)}
          >
            {TASK_STATUS.map((stt) => {
              return (
                <option key={stt.value} value={stt.value}>
                  {stt.label}
                </option>
              );
            })}
          </InputItem>
        </div>
        <Space>
          <Spin spinning={Submitting}>
            <Button type="primary" htmlType="submit" disabled={Submitting}>
              Submit
            </Button>
          </Spin>
        </Space>
      </form>
    );
    return xhtml;
  };
  return (
    <>
      <Modal
        title={taskReducer.modal !== null ? taskReducer.modal.title : ''}
        visible={taskReducer.showModal}
        onCancel={onCancel}
        footer={null}
      >
        {renderInput()}
      </Modal>
    </>
  );
};

export default ModalForm;
