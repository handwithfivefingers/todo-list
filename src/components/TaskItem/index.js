import {
  AnimatePresence,
  motion,
  useMotionValue,
  useDeprecatedInvertedScale,
} from 'framer-motion/dist/framer-motion';
import React, { useRef, useState } from 'react';

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
  Form,
  Popconfirm,
  Popover,
  Progress,
  Row,
  Space,
} from 'antd';

import styles from './styles.module.scss';
import { closeSpring, openSpring } from '../../helper/animation';
import { useScrollConstraints, useWheelScroll } from '../../helper/hook';
import { useInvertedBorderRadius } from '../../helper/hook/useInvertedBorderRadius';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import TaskTitle from './TaskTitle';
import TaskBody from './TaskBody';
import TaskFooter from './TaskFooter';

const dismissDistance = 150;

const TaskItem = (props) => {
  const handleSetting = () => {};

  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);

  const { task, index, onDragStart } = props;

  // Maintain the visual border radius when we perform the layoutTransition by inverting its scaleX/Y

  const containerRef = useRef(null);

  const onFinish = () => {
    console.log(form.getFieldsValue());
  };

  return (
    <AnimatePresence>
      {task && (
        <div
          className={[
            styles.motionBlock,
            'animate__animated animate__fadeInUp',
          ].join(' ')}
          ref={containerRef}
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
        >
          <div
            className={[
              styles.motion,
              styles.todoCard,
              (open && styles.open) || '',
            ].join(' ')}
            layoutTransition={open ? openSpring : closeSpring}
            draggable={open ? false : true}
            onDragStart={(e) => onDragStart(e, task)}
          >
            <Form
              form={form}
              initialValues={{ ...task }}
              layout="vertical"
              onFinish={onFinish}
            >
              <TaskTitle open={open} name={task?.name} />

              <TaskBody
                open={open}
                desc={task.desc}
                progress={task.progress}
                issue={task.issue}
              />
              <TaskFooter open={open} onFinish={onFinish} />
            </Form>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TaskItem;

/**
 * 
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
                    onClick={() =>
                      setConfigModal((state) => ({
                        ...state,
                        visible: true,
                        data: task,
                      }))
                    }
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
 */
