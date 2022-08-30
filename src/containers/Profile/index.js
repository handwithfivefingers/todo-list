import React, { useRef, useState } from 'react';
import { Avatar, Badge, Col, Form, Row, Space } from 'antd';

const Profile = () => {
  const formRef = useRef();
  const onFinish = (val) => {
    console.log(val);
  };

  return (
    <Row gutter={[16, 12]} justify="start" style={{ padding: '12px' }}>
      <Col span={24}>
        <Space size="large" style={{ float: 'right' }}>
          <Badge count={5}>
            <Avatar shape="square" size="large" />
          </Badge>
          <Badge count={0} showZero>
            <Avatar shape="square" size="large" />
          </Badge>
        </Space>
      </Col>
      <Col span={24}>
        <Form
          onFinish={onFinish}
          ref={formRef}
          labelCol={{ span: 8 }}
          layout="horizontal"
        ></Form>
      </Col>
    </Row>
  );
};

export default Profile;
