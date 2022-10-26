import { Button, Col, Modal, Input, Form, InputNumber } from 'antd';
import React, { useMemo, useRef } from 'react';
import TaskService from '../../service/task.service';
import TaskItem from '../TaskItem';
import styles from './styles.module.scss';

const TaskList = (props) => {
  const { stt, counting, onDragEvent, onUpdate, setConfigModal } = props;
  const createRef = useRef();
  const onDragStart = (e, item) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text', JSON.stringify(item));
  };

  const onDragOver = (event) => {
    event.preventDefault();
  };

  const onHandleDrop = (event, stt) => {
    event.preventDefault();
    let item = JSON.parse(event.dataTransfer.getData('text'));
    if (!item) return;
    if (item.status === stt.value) return;
    onDragEvent(item._id, stt.value);
  };

  const renderCardItem = useMemo(() => {
    return (
      props?.task &&
      props?.task?.map((item, index) => (
        <TaskItem
          key={index}
          task={item || null}
          index={index}
          onDragStart={onDragStart}
          onUpdate={onUpdate}
          setConfigModal={setConfigModal}
        />
      ))
    );
  }, [props?.task]);

  const openModal = () => {
    Modal.success({
      icon: '',
      title: 'Create Event',
      content: (
        <Form ref={createRef} layout="vertical">
          <Form.Item name={['name']} label="Name">
            <Input />
          </Form.Item>
          <Form.Item name={['desc']} label="Description">
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item name={['issue']} label="Issue">
            <Input />
          </Form.Item>
          <Form.Item name={['progress']} label="Progressing">
            <InputNumber min={0} max={100} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name={['status']} label="Status">
            <InputNumber min={0} max={4} style={{ with: '100%' }} />
          </Form.Item>
        </Form>
      ),
      onOk: () => createTask(),
    });
  };

  const createTask = async () => {
    let value = createRef.current?.getFieldsValue();
    console.log(value);

    let res = await TaskService.create({...value, project: props?.projectId});
    console.log(res);
  };

  return (
    <Col
      className="gutter-row task-background"
      xs={24}
      sm={12}
      md={8}
      lg={8}
      xl={6}
    >
      <div
        className={[styles.taskBackgroundComponent, 'scrollbar'].join(' ')}
        onDrop={(ev) => onHandleDrop(ev, stt)}
        onDragOver={onDragOver}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <h2>{stt.label}</h2>
          <span>{counting}</span>
        </div>
        <div className={[styles.cardList, 'scrollbar'].join(' ')}>
          {renderCardItem}
        </div>

        <Button className="task-btn" onClick={openModal}>
          Add new
        </Button>
      </div>
    </Col>
  );
};
export default TaskList;
