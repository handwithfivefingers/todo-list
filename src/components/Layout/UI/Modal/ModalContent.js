import { Button, Form, Input, Select, Slider, Spin } from 'antd';
import React, { useState } from 'react';

const ModalContent = (props) => {
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
            <Button htmlType="submit" type="primary"> Submit</Button>
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

            <Button htmlType="submit" type="primary" > Submit</Button>

          </Form.Item>
        </>
      );
    default:
      return;
  }
}

export default ModalContent;
