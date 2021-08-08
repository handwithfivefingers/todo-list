import React from 'react';
import { Form, Input, Button, Select } from 'antd';
import { FormInstance } from 'antd/lib/form';

const InputItem = (props) => {
  switch (props.type) {
    case 'text':
      return (
        <>
          <label>{props.label}</label>
          <Input
            type="text"
            value={props.value}
            onChange={props.onChange}
            size={props.size}
          />
        </>
      );
    case 'number':
      return (
        <>
          <label>{props.label}</label>
          <Input
            type="number"
            value={props.value}
            onChange={props.onChange}
            min={props.min}
            max={props.max}
            size={props.size}
          />
        </>
      );
    case 'email':
      return (
        <>
          <label>{props.label}</label>
          <Input
            type="email"
            value={props.value}
            onChange={props.onChange}
            size={props.size}
          />
        </>
      );
    case 'password':
      return (
        <>
          <label>{props.label}</label>
          <Input.Password
            size={props.size}
            type="password"
            value={props.value}
            onChange={props.onChange}
          />
        </>
      );
    case 'select':
      return (
        <>
          <label>{props.label}</label>
          <Select
            defaultValue={props.defaultValue}
            style={{ width: '75%' }}
            onChange={props.onChange}
          >
            {props.children}
          </Select>
        </>
      );
    case 'validate':
      return (
        <>
          <div
            className={`error-validate ${
              props.validation ? 'err-validate' : 'validate'
            }`}
            style={{ display: 'none' }}
          >
            {props.content}
          </div>
        </>
      );
    default:
      return;
  }
};

export default InputItem;
