import { Input, Select, Space, DatePicker, Form, Button, Col, Row } from 'antd';
import React, { createRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { SearchTask, Filter } from '../../actions/task';
import { SearchOutlined } from '@ant-design/icons';
import moment from 'moment';
const SearchItem = ({ projectId }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const formRef = createRef();
  // Didmount => Fetch task
  useEffect(() => {
    const form = new FormData();
    form.append('search', '');
    form.append('project', projectId);
    dispatch(SearchTask(form));
  }, []);

  // Cần filter trên store
  // Nhưng fetch lại task nếu có update
  const onFinish = (value) => {
    setLoading(true);
    console.log(value)
    let { Search, Status, Date } = value;
    const form = new FormData();
    form.append('search', Search !== undefined ? Search : '')
    form.append('project', projectId);
    if (Status !== undefined) {
      form.append('status', Status)
    }
    if (Date !== undefined && Date !== null) {
      form.append('date', moment(Date))
    }
    dispatch(SearchTask(form))
      .finally(() => {
        setLoading(false)
      })
  }
  return (
    <Form
      onFinish={onFinish}
      ref={formRef}
    >
      <Input.Group compact>
        <Form.Item name="Search" style={{ margin: 0 }}>
          <Input
            allowClear
            placeholder="Search..."
          />
        </Form.Item>
        <Form.Item name="Status" style={{ margin: 0 }}>
          <Select placeholder='Status' defaultValue={''} style={{ textAlign: 'left' }}>
            <Select.Option value={''}>
              Any
            </Select.Option>
            <Select.Option value={0}>
              To do
            </Select.Option>
            <Select.Option value={1}>
              In Progress
            </Select.Option>
            <Select.Option value={2}>
              Done
            </Select.Option>
            <Select.Option value={3}>
              Pending
            </Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="Date" style={{ margin: 0 }}>
          <DatePicker placeholder={moment(new Date()).format('YYYY-MM-DD')} style={{ width: '100%' }} allowClear />
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

export default SearchItem;
