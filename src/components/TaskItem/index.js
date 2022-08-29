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

  const yAxis = useMotionValue(0);

  const zIndex = useMotionValue(open ? 2 : 0);

  // Maintain the visual border radius when we perform the layoutTransition by inverting its scaleX/Y

  const inverted = useInvertedBorderRadius(20);

  // We'll use the opened card element to calculate the scroll constraints
  const cardRef = useRef(null);

  const constraints = useScrollConstraints(cardRef, open);

  const checkZIndex = (latest) => {
    if (open) {
      zIndex.set(9);
    } else if (!open && latest.scaleX < 1.01) {
      zIndex.set(0);
    }
  };

  // When this card is selected, attach a wheel event listener
  const containerRef = useRef(null);

  let { scaleX, scaleY } = inverted;
  const scaleTranslate = ({ x, y, scaleX, scaleY }) =>
    `scaleX(${scaleX}) scaleY(${scaleY}) translate(${x}, ${y}) translateZ(0)`;

  const animateStart = () => {};

  const onFinish = () => {
    console.log(form.getFieldsValue());
  };

  return (
    <AnimatePresence>
      {task && (
        <div
          className={styles.motionBlock}
          ref={containerRef}
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
        >
          <Overlay isSelected={open} setOpen={setOpen} />

          <motion.div
            ref={cardRef}
            isOpen={open}
            className={[
              styles.motion,
              styles.todoCard,
              (open && styles.open) || '',
            ].join(' ')}
            layoutTransition={open ? openSpring : closeSpring}
            onUpdate={checkZIndex}
            style={{
              ...inverted,
              y: yAxis,
            }}
            onAnimationStart={animateStart}
            dragConstraints={constraints}
            onClick={() => setOpen(open ? open : true)}
            draggable={open ? false : true}
            onDragStart={(e) => onDragStart(e, task)}
            transformTemplate={scaleTranslate}
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
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const Overlay = ({ isSelected, setOpen }) => {
  let location = useLocation();
  return (
    <motion.div
      initial={false}
      animate={{ opacity: isSelected ? 1 : 0 }}
      transition={{ duration: 0.2 }}
      style={{ pointerEvents: isSelected ? 'auto' : 'none' }}
      className={styles.overlay}
    >
      <a onClick={(e) => setOpen(false)} />
    </motion.div>
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
