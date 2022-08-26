import React from 'react';

import {
  CalendarOutlined,
  EditOutlined,
  RestOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import {
  Alert,
  Avatar,
  Col,
  Popconfirm,
  Popover,
  Progress,
  Row,
  Space,
  Modal,
} from 'antd';
const TaskItem = (props) => {
  const handleDropdownMenu = () => {};
  const handleSetting = () => {};
  const { task, index } = props;
  return (
    <div
      onClick={() => void 0}
      className={`todo-card-ui animate__animated animate__fadeInUp `}
      style={{
        ['--animate-duration']: `${(index + 1) / 10}s`,
        ['--animate-delay']: `0.2s`,
      }}
    >
      <Row gutter={6} style={{ maxWidth: '100%', padding: 10 }}>
        <Col span={24} style={{ textAlign: 'left' }}>
          <Space align="start" style={{ columnGap: 4 }}>
            <Avatar
              size="small"
              style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
            >
              T
            </Avatar>
            <h3 className="title">{task.name}</h3>
          </Space>
        </Col>
        <Col span={24}>
          <p className="desc">{task.desc}</p>
        </Col>
        <Col span={24}>
          <Progress
            percent={task?.progress}
            size="small"
            status={task?.progress === 100 ? 'success' : 'active'}
          />
        </Col>
        {task.issue && (
          <Alert
            style={{
              padding: 5,
              textAlign: 'left',
              width: '100%',
              alignItems: 'center',
            }}
            message="Issue:"
            description={task?.issue}
            showIcon
            type="error"
          />
        )}
      </Row>
      <div className="footer">
        <div className="action-button">
          <Popover content="Setting" trigger="hover">
            <SettingOutlined
              key="setting"
              onClick={() => handleSetting(false)}
            />
          </Popover>
          <Popover content="Edit Task" trigger="hover">
            <EditOutlined key="edit" onClick={() => void 0} />
          </Popover>
          <Popover content="Task over" trigger="hover">
            <CalendarOutlined
              key="calendar"
              onClick={() => handleDropdownMenu(false)}
            />
          </Popover>
          <Popover content="Delete Task" trigger="hover">
            <Popconfirm
              title="Bạn có chắc muốn xóa task này ?"
              onConfirm={(e) => void 0}
              okText="Xóa"
              cancelText="Không"
            >
              <RestOutlined key="restout" />
            </Popconfirm>
          </Popover>
        </div>
      </div>

      <Modal></Modal>
    </div>
  );
};

export default TaskItem;
