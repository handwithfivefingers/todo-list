import {
  EditOutlined,
  LoginOutlined,
  PlusSquareOutlined,
  RestOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import {
  Button,
  Col,
  Popover,
  Progress,
  Row,
  Spin,
  Popconfirm,
  Card,
  message,
  Modal,
  Mentions,
} from 'antd';
import React, { Component, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import ModalForm from '../../components/Layout/UI/Modal/ModalForm';
import UserSelected from '../../components/Layout/UI/Modal/UserSelected';
import { useFetch } from '../../helper/hook';
import ProjectService from '../../service/project.service';
import { useIsPresent, motion } from 'framer-motion/dist/framer-motion';

const Project = (props) => {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const projectRef = useRef(new Array());
  let navigate = useNavigate();

  const { data, isLoading, status, refetch } = useFetch({
    cacheName: [`projectList`],
    fn: () => ProjectService.getAll(),
  });

  const isPresent = useIsPresent();

  if (data) projectRef.current = data.data;

  const renderCard = useMemo(
    () => () => {
      let xhtml = null;
      xhtml = projectRef?.current?.map((item, index) => {
        return (
          <Col
            xs={24}
            sm={12}
            md={12}
            lg={8}
            xl={6}
            key={item._id}
            className={`gutter-row animate__animated animate__fadeInUp `}
            style={{
              ['--animate-duration']: `${(index + 1) / 10}s`,
              ['--animate-delay']: `0.2s`,
            }}
          >
            <Card
              style={{ width: 'auto', marginTop: 16 }}
              bodyStyle={{ padding: 10 }}
              actions={renderAction(item)}
            >
              <Card.Meta
                avatar={
                  <Progress
                    type="circle"
                    percent={50}
                    width={80}
                    status={item.status}
                  />
                }
                style={{ padding: 5 }}
                title={item?.name}
                description={
                  <ul>
                    <li>Created: {item.createdAt}</li>
                    <li>
                      Author:
                      {`${item.userOwner?.firstName} ${item.userOwner?.lastName}`}
                    </li>
                  </ul>
                }
              />
              <Card type="inner" bordered={false} bodyStyle={{ padding: 0 }}>
                <Card.Meta
                  style={{
                    display: 'flex',
                    width: '100%',
                    padding: 5,
                    justifyContent: 'center',
                  }}
                  description={
                    <span style={{ color: '#333' }}>{item.desc}</span>
                  }
                />
              </Card>
            </Card>
          </Col>
        );
      });
      return xhtml;
    },
    [projectRef.current]
  );

  const renderAction = (item) => {
    let xhtml = [];
    xhtml.push(
      <Link
        key={item._id}
        to={`/project/${item.slug}`}
        state={{ projectId: item._id }}
        style={{
          width: '100%',
          borderRight: '1px solid #eee',
          color: 'inherit',
        }}
      >
        <LoginOutlined />
      </Link>
    );
    return xhtml;
  };

  return (
    <Row>
      <Col>
        <Popover content="Add new project" trigger="hover">
          <Button type="primary" onClick={() => setShowForm(!showForm)}>
            <PlusSquareOutlined /> New Project
          </Button>
        </Popover>
      </Col>
      <Spin spinning={loading}>
        <Row gutter={8}>{renderCard()}</Row>
      </Spin>

      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0, transition: { duration: 0.5, ease: 'circOut' } }}
        exit={{ scaleX: 1, transition: { duration: 0.5, ease: 'circIn' } }}
        style={{ originX: isPresent ? 0 : 1 }}
        className="privacy-screen"
      />
    </Row>
  );
};
export default Project;
