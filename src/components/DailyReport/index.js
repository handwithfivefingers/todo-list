import React, { useEffect, useRef, useState } from 'react';
import { Col, Button } from 'antd';
import { useSelector } from 'react-redux';
import { TASK_STATUS } from '../../constant/task';
const DailyReport = ({ projectId, label }) => {
  const tasks = useSelector(state => state.taskReducer.tasks);
  const ref = useRef();

  const generatingReportText = () => {
    let xhtml = null;
    /** List generate following :
     * Daily report: 
     * Done: (get list done/ in progress)
     * Issue: (get issue field)
     * Will do: (get list to do)
     *   */
    const listTaskGen = tasks?.filter(task => task.project === projectId)
    xhtml = TASK_STATUS.map(taskStatus => {
      const TaskGen = listTaskGen?.filter(taskGen => parseInt(taskGen.status) === taskStatus.value);
      return (
        <ul key={`report-${projectId}-${taskStatus.value}`} style={{ textAlign: 'left', padding: 8 }}>
          <p>{taskStatus.value === 0 ? 'Will Do' : taskStatus.label}:</p>
          {TaskGen?.map(item => {
            return (
              <li key={item._id}>
                <p> {item.status == 0 ? `${item.name}: ${item.progress ? item.progress : 0}` : `${item.name}: ${item.progress ? item.progress : 0}`}</p>
                <p>{item.desc}</p>
              </li>
            )
          })}
        </ul>

      )
    })
    return xhtml;
  }
  return (
    <Col className="gutter-row task-background" xs={24} sm={12} md={8} lg={8} xl={6}>
      <div className="task-background-component">
        <h2>{label}</h2>
        {/* {this.renderCardItem()} */}
        <div ref={ref}>
          {generatingReportText() !== null ? generatingReportText() : ''}
        </div>
        <Button className="task-btn" onClick={generatingReportText}>
          Generate
        </Button>
      </div>
    </Col>
  );
}

export default DailyReport;
