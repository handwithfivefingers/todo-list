import React from 'react';
import { Space, Button, Avatar } from 'antd';
import { EnterOutlined, UserOutlined } from '@ant-design/icons';
import SearchBar from '../Search';
import { useLocation, useNavigate } from 'react-router-dom';

export default function TaskHeader(props) {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);

  let { state } = location;

  console.log('header', state);
  return (
    <Space
      className="search-layout"
      size="large"
      style={{ width: '100%', justifyContent: 'space-between' }}
    >
      <Button type="primary" onClick={() => navigate('/project', { state })}>
        <EnterOutlined /> Back
      </Button>

      <SearchBar />

      <div className="avatar">
        <Avatar icon={<UserOutlined />} />
      </div>
    </Space>
  );
}
