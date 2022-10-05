import React from 'react';

import { closeSpring, openSpring } from '../../../helper/animation';
import { Avatar, Form, Input } from 'antd';

export default function TaskTitle({ open, name }) {
  return (
    <div>
      <Avatar
        size="small"
        style={{
          color: '#f56a00',
          backgroundColor: '#fde3cf',
        }}
      >
        T
      </Avatar>
      {open ? (
        <Form.Item name="name" label="name">
          <Input />
        </Form.Item>
      ) : (
        <h3 className="title">{name}</h3>
      )}
    </div>
  );
}
