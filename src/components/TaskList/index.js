import { Button, Col } from 'antd';
import React, { useMemo } from 'react';
import TaskItem from '../TaskItem';
import styles from './styles.module.scss';

const TaskList = (props) => {
  const { stt, counting, onDragEvent, onUpdate, setConfigModal } = props;

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

        <Button className="task-btn">Add new</Button>
      </div>
    </Col>
  );
};
export default TaskList;
