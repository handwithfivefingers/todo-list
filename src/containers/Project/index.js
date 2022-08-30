import { LoginOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { Button, Card, Col, Popover, Progress, Row, Spin } from 'antd';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFetch } from '../../helper/hook';
import ProjectService from '../../service/project.service';

const Project = (props) => {
  const [showForm, setShowForm] = useState(false);

  const { data, isLoading, status, refetch } = useFetch({
    cacheName: [`projectList`],
    fn: () => ProjectService.getAll(),
  });

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
  }

  const renderCard = () => {
    let xhtml = null;
    xhtml =
      data &&
      data?.data?.map((item, index) => {
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

      <Row gutter={8}>{status === 'success' && renderCard()}</Row>
    </Row>
  );
};
export default Project;
