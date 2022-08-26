import { EnterOutlined, UserOutlined } from '@ant-design/icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Avatar, Button, Col, message, Row, Space, Spin } from 'antd';
import React, { Component, useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TASK_STATUS } from '../../constant/task';
import { useFetch } from '../../helper/hook';
import TaskService from '../../service/task.service';
import TaskList from './../../components/TaskList';

const TaskBoard = (props) => {
  let location = useLocation();

  const queryClient = useQueryClient();

  let navigate = useNavigate();

  const taskRef = useRef(new Array());

  const { projectId } = location.state;

  if (!projectId) navigate(-1);

  const fetchTodos = () => TaskService.getAll({ _id: projectId, search: '' });

  const { data, isLoading, status, refetch } = useFetch({
    cacheName: [`taskList-${location.state.projectId}`],
    fn: fetchTodos,
  });

  const mutation = useMutation((params) => TaskService.update(params), {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries([`taskList-${location.state.projectId}`]);
    },
  });

  if (data) taskRef.current = data.data;

  const renderTaskBoard = () => {
    let xhtml = null;

    if (location.state !== null && location.state !== undefined) {
      xhtml = TASK_STATUS.map((status, index) => {
        const task = taskRef.current?.filter(
          (item) => parseInt(item.status) === status.value
        );
        return (
          <TaskList
            key={status._id}
            task={task}
            stt={{ label: status.label, value: status.value }}
            counting={task?.length}
            projectId={location.state.projectId}
            onDragEvent={(id, status) => mutation.mutate({ _id: id, status })}
          />
        );
      });
    }
    return xhtml;
  };

  return (
    <>
      <Space
        className="search-layout"
        size="large"
        style={{ width: '100%', justifyContent: 'space-between' }}
      >
        <Button type="primary" onClick={() => navigate(-1)}>
          <EnterOutlined /> Back
        </Button>

        {/* <SearchItem
          projectId={
            location.state !== null && location.state !== undefined
              ? location.state.projectId
              : 'Error'
          }
        /> */}

        <div className="avatar">
          <Avatar icon={<UserOutlined />} />
        </div>
      </Space>

      <Row gutter={[16, 24]} style={{ marginTop: '20px' }}>
        {!isLoading && status === 'success' && renderTaskBoard()}
      </Row>
    </>
  );
};
export default TaskBoard;
