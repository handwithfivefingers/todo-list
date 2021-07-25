import React from 'react';
import { Form, Input, Button, Select } from 'antd';
import { FormInstance } from 'antd/lib/form';


const InputItem = (props) => {
  switch (props.type) {
    case 'text':
      return (
        <>
          <label>{props.label}</label>
          <input
            className="form-control"
            type="text"
            value={props.value}
            onChange={props.onChange}
          />
        </>
      );
      case 'password':
        return (
          <>
            <label>{props.label}</label>
            <input
              className="form-control"
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
          <div className="select">
            <select
              className="form-control"
              value={props.value}
              onChange={props.onChange}
            >
              {props.children}
            </select>
          </div>
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
