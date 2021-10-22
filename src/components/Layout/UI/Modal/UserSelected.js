import React, { useState } from 'react';
import { Mentions, Form, Button, Space } from 'antd'
import axios from './../../../../helper/AxiosService';
import debounce from 'lodash/debounce';
import { UserAddOutlined } from '@ant-design/icons';
const { Option } = Mentions
const UserSelected = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const onSearch = e => {
    if (e.length > 0) {
      setLoading(true)
      setUsers([])
      loadGithubUsers(e);
    } else {
      return
    }
  };

  const loadGithubUsers = (key) => {
    const form = new FormData();
    form.append('name', key)
    axios.post('/user', form)
      .then(res => {
        setUsers(res.data.user.slice(0, 10))
        setLoading(false)
      })
      .catch(err => console.log(err.response))
      .finally(() => {
        setLoading(false)
      })
  }
  const onFinish = (val) => {
    const form = new FormData();
    form.append('user', val.userSelected.split(' '))
    axios.post(`/userapply`, form)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err.response);
      })
  }
  return (
    <Form onFinish={onFinish}>
      <h3 style={{ color: '#1890ff' }}><UserAddOutlined style={{ padding: '0 10px 0 0' }} />Thêm Thành viên</h3>
      <Form.Item name="userSelected">
        <Mentions style={{ width: '100%' }}
          placeholder="@email"
          loading={loading}
          onSearch={debounce(onSearch, 800)}
          autoSize
        >
          {users.map(({ email, _id: id }) =>
          (<Option key={id} value={email} className="antd-demo-dynamic-option">
            <span>{email}</span>
          </Option>)
          )}
        </Mentions>
      </Form.Item>
      <Form.Item>
        <Space style={{ float: 'right' }}>
          <Button type="primary" htmlType="submit">Thêm</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default UserSelected;