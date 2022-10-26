import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Form, Row } from 'antd';
import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TASK_STATUS } from '../../constant/task';
import { useFetch } from '../../helper/hook';
import TaskService from '../../service/task.service';
import TaskList from './../../components/TaskList';

import TaskHeader from '../../components/TaskHeader';

const TaskBoard = (props) => {
  let location = useLocation();

  const queryClient = useQueryClient();

  let navigate = useNavigate();

  const taskRef = useRef(new Array());

  const [form] = Form.useForm();

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

  if (!location?.state?.projectId) return null;

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

  return (
    <>
      <TaskHeader />

      <Row gutter={[16, 24]} style={{ marginTop: '20px' }}>
        {!isLoading && status === 'success' && renderTaskBoard()}
      </Row>
    </>
  );
};
export default TaskBoard;
