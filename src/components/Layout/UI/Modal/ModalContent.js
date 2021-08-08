import React, {useState} from 'react';
import InputItem from './../Input';
import { TASK_STATUS } from '../../../../constant/task';
import useSelector from 'antd/lib/table/hooks/useSelector';
import { Select} from 'antd';
const ModalContent = (props) => {
  const [name, SetName] = useState('');
  const [desc, SetDesc] = useState('');
  const [status, SetStatus] = useState(0);
  const [progress, Setprogress] = useState(0);
  const taskReducer = useSelector((state) => state.taskReducer);
  const authReducer = useSelector((state) => state.authReducer);
  const [Submitting, SetSubmitting] = useState(false);
  const [validation, Setvalidation] = useState(false);

  switch (props.type) {
    case "tasks":
      return (
        <form id="form-group" className="form-group" onSubmit={props.SubmitTodoForm}>
          <div className="input">
            <InputItem
              type="text"
              label="Name"
              // value={name}
              value={name}
              onChange={props.onChange}
            />
          </div>
          <InputItem
            type="validate"
            validation={props.validation}
            content=" Title must have 4 character minimum !"
          />
          <div className="input">
            <InputItem
              type="text"
              label="Desc"
              // value={desc}
              value={desc}
              onChange={(e) => SetDesc(e.target.value)}
            />
          </div>
          <div className="input">
            <label>Status</label>
            <Select
              value={status}
              style={{ width: '75%' }}
              onChange={(value) => SetStatus(value)}
            >
              {TASK_STATUS.map((stt) => {
                return (
                  <Select.Option key={stt.value} value={stt.value}>
                    {stt.label}
                  </Select.Option>
                );
              })}
            </Select>
          </div>
        </form>
      );
    case "project":
      return (
        <form id="form-group" className="form-group" onSubmit={SubmitTodoForm}>
          <div className="input">
            <InputItem
              type="text"
              label="Name"
              // value={name}
              value={name}
              onChange={(e) => SetName(e.target.value)}
            />
          </div>
          <InputItem
            type="validate"
            validation={validation}
            content=" Title must have 4 character minimum !"
          />
          <div className="input">
            <InputItem
              type="text"
              label="Desc"
              // value={desc}
              value={desc}
              onChange={(e) => SetDesc(e.target.value)}
            />
          </div>
          <div className="input">
            <label>Status</label>
            <Select
              value={status}
              style={{ width: '75%' }}
              onChange={(value) => SetStatus(value)}
            >
              {TASK_STATUS.map((stt) => {
                return (
                  <Select.Option key={stt.value} value={stt.value}>
                    {stt.label}
                  </Select.Option>
                );
              })}
            </Select>
          </div>
        </form>
      );
    default:
      return;
  }
}

export default ModalContent;
