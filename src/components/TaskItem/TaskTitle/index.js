import React from 'react';
import {
  motion,
  useDeprecatedInvertedScale,
} from 'framer-motion/dist/framer-motion';
import { closeSpring, openSpring } from '../../../helper/animation';
import { Avatar, Form, Input } from 'antd';

export default function TaskTitle({ open, name }) {
  const inverted = useDeprecatedInvertedScale();
  const x = 0;
  const y = x;
  const scaleTranslate = ({ x, y, scaleX, scaleY }) =>
    `scaleX(${scaleX}) scaleY(${scaleY}) translate(${x}, ${y}) translateZ(0)`;

  return (
    <motion.div
      initial={false}
      animate={{ x, y }}
      transition={open ? openSpring : closeSpring}
      transformTemplate={scaleTranslate}
      style={{ ...inverted, originX: 0, originY: 0 }}
    >
      <Avatar
        size="small"
        style={{
          color: '#f56a00',
          backgroundColor: '#fde3cf',
        }}
      >
        T
      </Avatar>
      {open ? (
        <Form.Item name="name" label="name">
          <Input />
        </Form.Item>
      ) : (
        <h3 className="title">{name}</h3>
      )}
    </motion.div>
  );
}
