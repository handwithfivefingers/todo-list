import React, { useRef, useState, useEffect } from 'react';
import {
  Tooltip,
  Spin,
  Modal,
  Radio,
  Space,
  Button,
  Popover,
  Input,
  Progress,
  Select,
} from 'antd';
import {
  MinusOutlined,
  PlusOutlined,
} from '@ant-design/icons';
// import { FormInstance } from 'antd/lib/form';
// import InputItem from './Input';
import { TASK_STATUS } from '../../../../constant/task';
import { useDispatch, useSelector } from 'react-redux';
import { ModalAction } from '../../../../actions';
import { EditTask, AddNewTask } from '../../../../actions/task';
import { projectUpdate } from '../../../../actions/project';
import { HideModal } from '../../../../actions/modal';
import InputItem from '../Input';
const { Option } = Select;
const ModalForm = (props) => {
  const [name, SetName] = useState('');
  const [desc, SetDesc] = useState('');
  const [status, SetStatus] = useState(0);
  const [progress, Setprogress] = useState(0);

  const [Submitting, SetSubmitting] = useState(false);
  const [validation, Setvalidation] = useState(false);

  const taskReducer = useSelector((state) => state.taskReducer);
  const authReducer = useSelector((state) => state.authReducer);

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
    } else if (taskReducer.showModal && taskReducer.projecteditting) {
      SetName(taskReducer.projecteditting.name);
      SetDesc(taskReducer.projecteditting.desc);
      SetStatus(taskReducer.projecteditting.type);
      Setprogress(taskReducer.projecteditting.progress);
    } else {
      SetName('');
      SetDesc('');
      SetStatus(0);
      Setprogress(0);
    }
  }, [taskReducer.showModal, taskReducer.taskediting]);

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
    console.log(status)
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
      // console.log(taskReducer.taskediting._id);
      const id = taskReducer.taskediting._id;
      form.append('id', id);
      dispatch(EditTask(form));
    } else if (taskReducer.projecteditting && taskReducer.projecteditting._id) {
      form.append('id', taskReducer.projecteditting._id);
      form.append('progress', progress)
      dispatch(projectUpdate(form))
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

  const handleChange = (value) => {
    console.log(value);
  };

  const decline = () => {
    let prog = progress - 10;
    if (prog < 0) {
      prog = 0;
    }
    Setprogress(prog);
  };
  const increase = () => {
    let prog = progress + 10;
    if (prog > 100) {
      prog = 100;
    }
    Setprogress(prog);
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
        {taskReducer.modal && (taskReducer.modal.title !== 'Add New Project' && taskReducer.modal.title !== 'Update Project') ? (
          <>
            <div className="input">
              <label>Progress</label>
              <div
                className="form-control"
                style={{
                  width: '75%',
                  display: 'flex',
                  // flexWrap: 'wrap',
                  justifyContent: 'center',
                }}
              >
                <Progress percent={progress} />
                <Button.Group>
                  <Button onClick={decline} icon={<MinusOutlined />} />
                  <Button onClick={increase} icon={<PlusOutlined />} />
                </Button.Group>
              </div>
            </div>
            <div className="input">
              <label>Status</label>
              <Select
                value={status}
                style={{ width: '75%' }}
                onChange={(value) => SetStatus(value)}
              >
                {TASK_STATUS.map((stt) => {
                  return (
                    <Option key={stt.value} value={stt.value}>
                      {stt.label}
                    </Option>
                  );
                })}
              </Select>
            </div>
          </>
        ) : (
          <>
            <div className="input">
              <label>Progress</label>
              <div
                className="form-control"
                style={{
                  width: '75%',
                  display: 'flex',
                  // flexWrap: 'wrap',
                  justifyContent: 'center',
                }}
              >
                <Progress percent={progress} />
                <Button.Group>
                  <Button onClick={decline} icon={<MinusOutlined />} />
                  <Button onClick={increase} icon={<PlusOutlined />} />
                </Button.Group>
              </div>
            </div>

            <div className="input">
              <label>Status</label>
              <Select
                defaultValue="normal"
                style={{ width: '75%' }}
                onChange={handleChange}
              >
                <Option value="normal">Normal</Option>
                <Option value="active">Active</Option>
                <Option value="exception">Exception</Option>
              </Select>
            </div>
            <div className="input">
              <InputItem
                type="text"
                label="User Id"
                // value={desc}
                value={authReducer.user ? authReducer.user.user._id : ''}
              // onChange={(e) => SetDesc(e.target.value)}
              />
            </div>
          </>
        )}
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
