import React from 'react';
import { Form, Input, Button, Select } from 'antd';
import { FormInstance } from 'antd/lib/form';

const { Option } = Select;

const InputItem = (props) => {
  switch (props.type) {
    case 'text':
      return (
        <Form.Item
          name={props.name}
          label={props.label}
          rules={[{ required: true }]}
        >
          <Input value={props.name} pladeholder={props.name} />
        </Form.Item>
      );
    case 'textarea':
      return (
        <Form.Item
          name={props.name}
          label={props.label}
          rules={[{ required: true }]}
        >
          <Input value={props.name} pladeholder={props.name} />
        </Form.Item>
      );
    case 'select':
      console.log(props);
      return (
        <Form.Item
          name={props.name}
          label={props.label}
          rules={[{ required: true }]}
        >
          <Select
            placeholder="Select a option and change input text above"
            // onChange={this.onGenderChange}
            // allowClear
          >
            {props.children}
          </Select>
        </Form.Item>
      );
    default:
      return;
  }
};

export default InputItem;
