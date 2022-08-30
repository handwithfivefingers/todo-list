import { Row } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useDeprecatedInvertedScale,
} from 'framer-motion/dist/framer-motion';

const Home = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.component}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

const Card = (props) => {
  const ref = useRef();
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState(false);

  const animateConfig = {
    animate: {
      position: 'absolute',
      top: open ? `calc(50% - ${ref.current?.clientHeight / 2})` : 0,
      left: open ? `calc(50% - ${ref.current?.clientHeight / 2})` : 0,
      width: ref.current?.clientWidth,
      height: ref.current?.clientHeight,
      zIndex: open ? 2 : 0,
      opacity: open ? 1 : 0,
      scaleX: open ? 2 : 1,
      scaleY: open ? 2 : 1,
    },
    initial: false,
    onClick: () => setOpen(!open),
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 200,
    },
  };

  return (
    <div className={styles.item} style={{ position: 'relative' }} ref={ref}>
      <motion.div className={styles.itemFixed} {...animateConfig}></motion.div>
      <motion.h1 {...animateConfig}>hehe</motion.h1>
      <h1>hehe</h1>
    </div>
  );
};

export default Home;
