import React, { useRef, useState, useEffect } from 'react';
import styles from './styles.module.scss';
import { Button } from 'antd';
import { FireBase } from '../../configs/firebase';
const Home = () => {
  let [data, setData] = useState();

  useEffect(() => {
    getScreenData();
  }, []);

  const getScreenData = async () => {
    let res = await FireBase.getAllDocs('user');
    console.log(res);
  };

  const addData = async () => {
    console.log(FireBase);
    let res = await FireBase.createDoc('user', {
      username: 'hdme1997',
      password: '12345678',
      phone: '0798341239',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  };

  const updateDoc = async () => {
    console.log('update doc');
    let res = await FireBase.updateDoc('user', {
      username: 'hdme1997',
      password: '123456789',
      phone: '0798341239',
      updatedAt: new Date(),
    });
    console.log(res);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.component}>
        <Button onClick={addData}> addData</Button>
        <Button onClick={updateDoc}> updateDoc</Button>
      </div>
    </div>
  );
};

export default Home;
