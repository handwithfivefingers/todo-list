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
      <Form.Item>
        <Row>
          <Col span={10}>
            <Form.Item name="Search">
              <Input
                // onChange={(e) => SetSearch(e.target.value)}
                // onSearch={(e) => SetSearch(e)}
                allowClear
                placeholder="Search..."
              // style={{ width: '50%' }}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="Status" noStyle>
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
          </Col>
          <Col span={6}>
            <Form.Item name="Date">
              <DatePicker placeholder={moment(new Date()).format('YYYY-MM-DD')} style={{ width: '100%' }} allowClear />
            </Form.Item>
          </Col>
          <Col span={2}>
            <Form.Item>
              <Button
                icon={<SearchOutlined style={{opacity:0.45}}/>}
                loading={loading}
                style={{ width: '100%'}}
                // onClick={() => enterLoading()}
                htmlType="submit"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default SearchItem;
