import {
  Button, Form, Input, message, Modal, Select, Slider, Spin
} from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ModalAction } from '../../../../actions';
import { HideModal } from '../../../../actions/modal';
import { projectUpdate, createProject } from '../../../../actions/project';
import { AddNewTask, EditTask } from '../../../../actions/task';
import { TASK_STATUS } from '../../../../constant/task';


const { Option } = Select;
const ModalForm = (props) => {

  const taskReducer = useSelector((state) => state.taskReducer);
  const authReducer = useSelector((state) => state.authReducer);

  const formRef = React.createRef();
  const dispatch = useDispatch();

  const onCancel = () => {
    const { HideModal } = ModalAction;
    dispatch(HideModal());
  };
  useEffect(() => {
    if (authReducer.user) {
      formRef.current?.setFieldsValue({
        userid: authReducer.user._id,
        project: taskReducer.modal.projectId ? taskReducer.modal.projectId : ''
      })
    }
    // Task update
    if (taskReducer.showModal && taskReducer.taskediting) {
      formRef.current.setFieldsValue({
        name: taskReducer.taskediting.name,
        desc: taskReducer.taskediting.desc,
        status: taskReducer.taskediting.status,
        id: taskReducer.taskediting._id,
        project: taskReducer.taskediting.project,
        progress: taskReducer.taskediting.progress,
        issue: taskReducer.taskediting.issue
      })
    }
    // Project update
    else if (taskReducer.showModal && taskReducer.projecteditting) {
      formRef.current.setFieldsValue({
        name: taskReducer.projecteditting.name,
        desc: taskReducer.projecteditting.desc,
        progress: taskReducer.projecteditting.progress,
        status: taskReducer.projecteditting.status,
        id: taskReducer.projecteditting._id
      })
    }
    //  Task/Project create
    else {
      formRef.current?.setFieldsValue({
        name: '',
        desc: '',
        progress: 0,
        status: props.project ? 'active' : 0,
        id: '',
        issue: ''
      })
    }
  }, [taskReducer.showModal])

  const onFinish = (val) => {
    let id = formRef.current.getFieldValue('id');
    let projectid = formRef.current.getFieldValue('project');
    console.log('projectid', projectid);
    console.log(formRef.current.getFieldsValue())
    if (id !== "") {
      // update
      if (taskReducer.projecteditting && taskReducer.projecteditting._id) {
        // Project update
        dispatch(projectUpdate(val))
        // message.success('Project updated successfully');
      } else if (taskReducer.taskediting && taskReducer.taskediting._id) {
        // Task update
        dispatch(EditTask(val));
        // message.success('Task updated successfully');
      }
    } else if (projectid !== "" && projectid !== undefined) {
      //create
      // Task
      dispatch(AddNewTask(val));
      // message.success('Task created successfully');
    } else {
      // Project
      dispatch(createProject(val));
      // message.success('Project created successfully');
    }
    dispatch(HideModal());
  }
  const renderTask = () => {
    return (
      <Form
        onFinish={onFinish}
        labelCol={{ span: 6 }}
        ref={formRef}
        initialValues={{
          progress: 0,
          status: 'active'
        }}
      >
        <Form.Item
          label="Task Name"
          name="name"
          rules={[{ required: true, message: 'Title atleast 4 character' }]}
        >
          <Input allowClear />
        </Form.Item>
        <Form.Item label="Description" name="desc" >
          <Input.TextArea allowClear />
        </Form.Item>
        <Form.Item label="Progress" name="progress" >
          <Slider
            dots
            step={10}
            onChange={(value) => { formRef.current?.setFieldsValue({ progress: value }) }}
          // onAfterChange={(value) => { console.log('onAfterChange: ', value); }}
          />
        </Form.Item>

        <Form.Item label="Status" name="status">
          <Select>
            {TASK_STATUS.map((stt) => {
              return (
                <Option key={stt.value} value={stt.value}>
                  {stt.label}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item label="Issue" name="issue" >
          <Input.TextArea allowClear />
        </Form.Item>
        <Form.Item label="ID" name="id" style={{ display: 'none' }}>
          <Input readOnly />
        </Form.Item>
        <Form.Item label="Project ID" name="project" style={{ display: 'none' }}>
          <Input readOnly />
        </Form.Item>
        <Form.Item label="User ID" name="userid" style={{ display: 'none' }}>
          <Input readOnly />
        </Form.Item>
        <Form.Item>
          <Spin spinning={false}>
            <Button htmlType="submit" type="primary" disabled={false}> Submit</Button>
          </Spin>
        </Form.Item>
      </Form>
    )
  }
  const renderProject = () => {
    return (
      <Form
        onFinish={onFinish}
        labelCol={{ span: 6 }}
        ref={formRef}
      >
        <Form.Item
          label="Project Name"
          name="name"
          rules={[{ required: true, message: 'Title atleast 4 character' }]}
        >
          <Input allowClear />
        </Form.Item>
        <Form.Item label="Description" name="desc" >
          <Input.TextArea allowClear />
        </Form.Item>
        <Form.Item label="Progress" name="progress" >
          <Slider
            dots
            step={10}
            defaultValue={0}
            onChange={(value) => { formRef.current?.setFieldsValue({ progress: value }) }}
          />
        </Form.Item>
        <Form.Item label="Status" name="status">
          <Select defaultValue={taskReducer.projecteditting ? taskReducer.projecteditting.status : 'active'}>
            <Select.Option value='active'> Active </Select.Option>
            <Select.Option value='exception'> Exception </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="ID" name="id" style={{ display: 'none' }}>
          <Input readOnly />
        </Form.Item>
        <Form.Item label="User ID" name="userid" style={{ display: 'none' }}>
          <Input readOnly />
        </Form.Item>
        <Form.Item>
          <Spin spinning={false}>
            <Button htmlType="submit" type="primary" disabled={false}> Submit</Button>
          </Spin>
        </Form.Item>
      </Form>
    )
  }
  return (
    <>
      <Modal
        title={taskReducer.modal !== null ? taskReducer.modal.title : ''}
        visible={taskReducer.showModal}
        onCancel={onCancel}
        footer={null}
      >
        {props.project ? renderProject() : renderTask()}
      </Modal>
    </>
  );
};

export default ModalForm;
