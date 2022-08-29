import { Input, Select, Space, DatePicker, Form, Button, Col, Row } from 'antd';
import React, { createRef, useEffect, useState, useRef } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import moment from 'moment';
const SearchBar = ({ projectId }) => {
  const [loading, setLoading] = useState(false);

  const formRef = useRef();

  const onFinish = (val) => {
    console.log(val);
  };
  
  return (

    <Form onFinish={onFinish} ref={formRef}>
      <Input.Group compact>
        <Form.Item name="Search" style={{ margin: 0 }}>
          <Input allowClear placeholder="Search..." />
        </Form.Item>
        <Form.Item name="Status" style={{ margin: 0 }}>
          <Select
            placeholder="Status"
            defaultValue={''}
            style={{ textAlign: 'left' }}
          >
            <Select.Option value={''}>Any</Select.Option>
            <Select.Option value={0}>To do</Select.Option>
            <Select.Option value={1}>In Progress</Select.Option>
            <Select.Option value={2}>Done</Select.Option>
            <Select.Option value={3}>Pending</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="Date" style={{ margin: 0 }}>
          <DatePicker
            placeholder={moment(new Date()).format('YYYY-MM-DD')}
            style={{ width: '100%' }}
            allowClear
          />
        </Form.Item>

        <Button
          icon={<SearchOutlined style={{ opacity: 0.45 }} />}
          loading={loading}
          htmlType="submit"
        />
      </Input.Group>
    </Form>
  );
};

export default SearchBar;
