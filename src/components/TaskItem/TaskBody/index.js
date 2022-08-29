import React from 'react';
import {
  motion,
  useDeprecatedInvertedScale,
} from 'framer-motion/dist/framer-motion';
import { Alert, Form, Input, Progress } from 'antd';
export default function TaskBody({ open, desc, progress, issue }) {
  const inverted = useDeprecatedInvertedScale();
  const renderInput = () => {
    return (
      <>
        <Form.Item name="desc" label="Description">
          <Input />
        </Form.Item>
        <Form.Item name="progress" label="Progress">
          <Input />
        </Form.Item>
        <Form.Item name="issue" label="Issue">
          <Input />
        </Form.Item>
      </>
    );
  };
  const renderHtml = () => {
    return (
      <>
        <p className="desc">{desc}</p>

        <Progress
          percent={progress}
          size="small"
          status={progress === 100 ? 'success' : 'active'}
        />

        {issue && (
          <Alert
            style={{
              padding: 5,
              textAlign: 'left',
              width: '100%',
              alignItems: 'center',
            }}
            message="Issue:"
            description={issue}
            showIcon
            type="error"
          />
        )}
      </>
    );
  };
  return (
    <motion.div style={{ ...inverted, originY: 0, originX: 0 }}>
      {open ? renderInput() : renderHtml()}
    </motion.div>
  );
}
