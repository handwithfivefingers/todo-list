import React, { Component } from 'react';
import {
  Progress,
  Row,
  Col,
  Tooltip,
  Avatar,
  Card,
  Space,
  Statistic,
  Slider,
  Spin,
  Table,
  Button,
  Input,
  Modal,
} from 'antd';
import {
  AnimatePresence,
  motion,
  useIsPresent,
} from 'framer-motion/dist/framer-motion';
import './style.css';

const Home = () => {
  const isPresent = useIsPresent();

  return (
    <Row gutter={[16, 24]}>
      Hello world
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{
          scaleX: 0,
          transition: { duration: 0.5, ease: 'circOut' },
        }}
        exit={{ scaleX: 1, transition: { duration: 0.5, ease: 'circIn' } }}
        style={{ originX: isPresent ? 0 : 1 }}
        className="privacy-screen"
      />
    </Row>
  );
};

export default Home;
