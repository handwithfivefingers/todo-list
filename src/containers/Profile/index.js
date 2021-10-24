import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons'
import { Form, Card, Row, Col, Button, Badge, Avatar, Space, Input, Collapse, Spin, message } from 'antd';
import axios from '../../helper/AxiosService';
const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [request, setRequest] = useState([])
  const authReducer = useSelector(state => state.authReducer);
  const user = authReducer.user ? authReducer.user : '';
  const formRef = useRef();
  useEffect(() => {
    setField()
  }, [formRef])
  useEffect(() => {
    getRequestData();
  }, [user])
  const getRequestData = () => {
    setLoading(true);
    const form = new FormData();
    form.append('_id', user?._id);
    axios.post('/project/request', form)
      .then(res => {
        setRequest(res.data.request);
      })
      .catch(err => {
        console.log(err.response)
      })
      .finally(() => {
        setLoading(false)
      })
  }
  const setField = () => {
    formRef.current.setFieldsValue({
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      role: user?.role,
    })
  }
  const onFinish = (val) => {
    console.log(val)
  }
  const acceptInvite = (req) => {
    setLoading(true);
    const form = new FormData();
    form.append('userId', user?._id)
    axios.post(`/project/request/${req._id}`, form)
      .then(res => {
        message.success('Đã tham gia Project :', req.name)
      })
      .catch(err => {
        console.log(err.response)
      })
      .finally(() => {
        getRequestData()
      })
  }
  const destroyInvite = (req) => {
    setLoading(true);
    const form = new FormData();
    form.append('userId', user?._id)
    axios.post(`/project/refuse/${req._id}`, form)
      .then(res => {
        message.success('Hủy thành công')
      })
      .catch(err => {
        console.log(err.response)
      })
      .finally(() => {
        getRequestData()
      })
  }
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
        <Form onFinish={onFinish} ref={formRef} labelCol={{ span: 8 }} layout="horizontal">
          <Row gutter={[16, 12]}>
            <Col span={6} gutter={[16, 12]} >
              <Card style={{ padding: 0 }} bodyStyle={{ padding: 0 }}>
                <Collapse accordion ghost expandIconPosition="right" onChange={() => setField()}>
                  <Collapse.Panel header={<h3 style={{ fontWeight: '500' }}>Thông tin cơ bản</h3>} key="1" showArrow={true}>
                    <Form.Item label="First Name" name="firstName" style={{ margin: 5 }}>
                      <Input readOnly style={{ border: 'none' }} />
                    </Form.Item>
                    <Form.Item label="Last Name" name="lastName" style={{ margin: 5 }}>
                      <Input readOnly style={{ border: 'none' }} />
                    </Form.Item>
                    <Form.Item label="Email" name="email" style={{ margin: 5 }}>
                      <Input readOnly style={{ border: 'none' }} />
                    </Form.Item>
                    <Form.Item label="Role" name="role" style={{ margin: 5 }}>
                      <Input readOnly style={{ border: 'none' }} />
                    </Form.Item>
                  </Collapse.Panel>
                </Collapse>

              </Card>
              <Card style={{ padding: 0 }} bodyStyle={{ padding: 0 }}>
                <Collapse accordion ghost expandIconPosition="right">
                  <Collapse.Panel header={<h3 style={{ fontWeight: '500' }}>Bảo Mật</h3>} key="21" showArrow={true}>
                    <Form.Item name="old_password" style={{ margin: 5 }}>
                      <Input.Password placeholder='Mật khẩu hiện tại' readOnly />
                    </Form.Item>
                    <Form.Item name="password" style={{ margin: 5 }}>
                      <Input.Password placeholder='Mật khẩu mới' readOnly />
                    </Form.Item>
                    <Form.Item name="confirm_password" style={{ margin: 5 }}>
                      <Input.Password placeholder='Xác thực' readOnly />
                    </Form.Item>
                  </Collapse.Panel>
                </Collapse>
              </Card>
              <Spin spinning={loading}>
                <Card title={`Project Request`}>
                  {
                    request?.length > 0
                      ?
                      request.map(req => <Space
                        style={{ justifyContent: 'space-between', width: '100%', padding: '8px 0' }}
                      >
                        <b> {req.name}</b>
                        {/* <Button type="primary"

                        >
                          Chấp Nhận
                        </Button> */}
                        <Space>
                          <Button type="primary" shape="circle" onClick={(e) => acceptInvite(req)}>
                            <PlusOutlined style={{ color: '#fff', fontSize: '16px' }} />
                          </Button>
                          <Button type="danger" shape="circle" onClick={(e) => destroyInvite(req)} >
                            <CloseOutlined style={{ color: '#fff', fontSize: '16px' }} />
                          </Button>
                          </Space>
                      </Space>)
                      :
                      <Space style={{ justifyContent: 'space-between', width: '100%', padding: '8px 0' }}>
                        Hiện không có lời mời nào
                      </Space>
                  }
                </Card>
              </Spin>
            </Col>

            <Col span={18}>
              <Card title={`Hello, ${authReducer.user ? authReducer.user.fullName : ''}`}>
                <Row>
                  <Col span={12}>
                    <Card title="Project cá nhân">

                    </Card>

                  </Col>
                  <Col span={12}>
                    <Card title="Project Tham gia">

                    </Card>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Form>
      </Col>


    </Row>
  );
}

export default Profile;


