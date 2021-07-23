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
  }, [taskReducer]);
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
    console.log('Name:', name, 'Desc: ', desc, 'Status: ', status);
    console.log('has been sent');
    if (taskReducer.taskediting && taskReducer.taskediting.id) {
      console.log(taskReducer.taskediting.id);
      dispatch(EditTask({ name, desc, status }, taskReducer.taskediting.id));
    } else {
      dispatch(AddNewTask({ name, desc, status }));
    }
    SetSubmitting((prevState) => !prevState);
    setTimeout(() => {
      SetSubmitting((prevState) => !prevState);
      dispatch(HideModal());
      Setvalidation(false);
    }, 1000);
  };
  const content = <p>Name To Do</p>;
  const renderInput = () => {
    let xhtml = null;
    xhtml = (
      <form id="form-group" className="form-group" onSubmit={SubmitTodoForm}>
        <div className="input">
          <label>Name</label>
          <input
            className="form-control"
            type="text"
            value={name}
            onChange={(e) => SetName(e.target.value)}
          />
        </div>
        <div
          className={`error-validate ${
            validation ? 'err-validate' : 'validate'
          }`}
          style={{ display: 'none' }}
        >
          Title must have 4 character minimum !
        </div>
        <div className="input">
          <label>Desc</label>
          <input
            className="form-control"
            type="text"
            value={desc}
            onChange={(e) => SetDesc(e.target.value)}
          />
        </div>
        <div className="input">
          <label>Status</label>
          <div className="select">
            <select
              className="form-control"
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
            </select>
          </div>
        </div>
        {/* <button className="btn" type="submit" disabled={Submitting}>
          Submit
        </button> */}
        <Space>
          <Spin spinning={Submitting}>
            <Button
              type="primary"
              htmlType="submit"
              disabled={Submitting}
              loading={Submitting}
            >
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
        title={taskReducer.title}
        visible={taskReducer.showModal}
        // onOk={props.handleSave}
        onCancel={onCancel}
        footer={null}
      >
        {renderInput()}
      </Modal>
    </>
  );
};

export default ModalForm;
