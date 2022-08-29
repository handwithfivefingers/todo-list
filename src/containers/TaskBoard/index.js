import { EnterOutlined, UserOutlined } from '@ant-design/icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Avatar, Button, Form, Input, Row, Select, Space } from 'antd';
import React, { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TASK_STATUS } from '../../constant/task';
import { useFetch } from '../../helper/hook';
import TaskService from '../../service/task.service';
import TaskList from './../../components/TaskList';

import {
  AnimatePresence,
  motion,
  useIsPresent,
} from 'framer-motion/dist/framer-motion';

import styles from './styles.module.scss';

import TaskHeader from '../../components/TaskHeader';

import { openSpring, closeSpring } from '../../helper/animation';

const TaskBoard = (props) => {
  let location = useLocation();

  const queryClient = useQueryClient();

  let navigate = useNavigate();

  const taskRef = useRef(new Array());

  const isPresent = useIsPresent();

  const [form] = Form.useForm();

  if (!location?.state?.projectId) navigate(-1);

  const { data, isLoading, status } = useFetch({
    cacheName: [`taskList-${location?.state?.projectId}`],
    fn: () =>
      TaskService.getAll({ _id: location?.state?.projectId, search: '' }),
  });

  const mutation = useMutation((params) => TaskService.update(params), {
    onSuccess: () => {
      queryClient.invalidateQueries([`taskList-${location.state.projectId}`]);
    },
  });

  if (data) taskRef.current = data.data;

  const renderTaskBoard = () => {
    let xhtml = null;
    if (location.state !== null && location.state !== undefined) {
      xhtml = TASK_STATUS.map(({ label, value }) => {
        const task = taskRef.current?.filter(
          ({ label, status }) => status === value
        );

        return (
          <TaskList
            key={status._id}
            task={task}
            stt={{ label, value }}
            counting={task?.length}
            projectId={location.state.projectId}
            onDragEvent={(id, status) => mutation.mutate({ _id: id, status })}
            onUpdate={(item) => mutation.mutate(item)}
          />
        );
      });
    }
    return xhtml;
  };

  const handleUpdate = () => {
    let val = form.getFieldsValue();
    console.log(val);
  };

  return (
    <>
      <TaskHeader />

      <Row gutter={[16, 24]} style={{ marginTop: '20px' }}>
        {!isLoading && status === 'success' && renderTaskBoard()}
      </Row>

      {/* <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0, transition: { duration: 0.5, ease: 'circOut' } }}
        exit={{ scaleX: 1, transition: { duration: 0.5, ease: 'circIn' } }}
        style={{ originX: isPresent ? 0 : 1 }}
        className="privacy-screen"
      /> */}
    </>
  );
};
export default TaskBoard;
