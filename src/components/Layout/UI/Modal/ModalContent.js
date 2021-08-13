import React, { useState } from 'react';
import InputItem from './../Input';
import { TASK_STATUS } from '../../../../constant/task';
import useSelector from 'react-redux';
import { Form, Input, Select, Button, Space, Slider, Spin } from 'antd';

import {
  MinusOutlined,
  PlusOutlined,
} from '@ant-design/icons';

const ModalContent = (props) => {

  const [name, SetName] = useState('');
  const [desc, SetDesc] = useState('');
  const [status, SetStatus] = useState(0);
  const [progress, Setprogress] = useState(0);

  const taskReducer = useSelector((state) => state.taskReducer);
  const authReducer = useSelector((state) => state.authReducer);

  const [Submitting, SetSubmitting] = useState(false);
  const [validation, Setvalidation] = useState(false);

  switch (props.type) {
    case "task":
      return (
        <>
          <Form.Item
            label="Name"
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
              step={10}
              defaultValue={0}
              onChange={(value) => { props.formRef.current?.setFieldsValue({ progress: value }) }}
              onAfterChange={(value) => { console.log('onAfterChange: ', value); }}
            />
          </Form.Item>
          <Form.Item label="Status" name="status">
            <Select defaultValue='active'>
              <Select.Option value='active'> Active </Select.Option>
              <Select.Option value='exception'> Exception </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Issue" name="issue" >
            <Input.TextArea allowClear />
          </Form.Item>
          <Form.Item label="User ID" name="userid" >
            <Input readOnly />
          </Form.Item>
          <Form.Item>
            <Spin spinning={Submitting}>
              <Button htmlType="submit" type="primary" disabled={Submitting}> Submit</Button>
            </Spin>
          </Form.Item>
        </>
      );
    case "project":
      return (
        <>
          <Form.Item
            label="Name"
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
              step={10}
              defaultValue={0}
              onChange={(value) => { props.formRef.current?.setFieldsValue({ progress: value }) }}
              onAfterChange={(value) => { console.log('onAfterChange: ', value); }}
            />
          </Form.Item>
          <Form.Item label="Status" name="status">
            <Select defaultValue='active'>
              <Select.Option value='active'> Active </Select.Option>
              <Select.Option value='exception'> Exception </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Issue" name="issue" >
            <Input.TextArea allowClear />
          </Form.Item>
          <Form.Item label="User ID" name="userid" >
            <Input readOnly />
          </Form.Item>
          <Form.Item>
            <Spin spinning={Submitting}>
              <Button htmlType="submit" type="primary" disabled={Submitting}> Submit</Button>
            </Spin>
          </Form.Item>
        </>
      );
    default:
      return;
  }
}

export default ModalContent;
