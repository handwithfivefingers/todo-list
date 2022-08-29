import { Button } from 'antd';
import React from 'react';

export default function TaskFooter({ open, onFinish }) {
  return (
    open && (
      <Button type="submit" onClick={onFinish}>
        Edit
      </Button>
    )
  );
}
