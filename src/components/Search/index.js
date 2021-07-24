import React, { useState, useEffect } from 'react';
import { Input, Space } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { fetchListTask } from '../../actions/task';
const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);

const SearchItem = (props) => {
  const [search, SetSearch] = useState('');
  const dispatch = useDispatch();
  // const onSearch = (value) => {
  //   dispatch(fetchListTask(value));
  //   console.log(value);
  // };
  // useEffect(() => {
  //   const SearchTimeout = setTimeout(() => {
  //     dispatch(fetchListTask(search));
  //   }, 1000);
  //   return () => clearTimeout(SearchTimeout);
  // }, [search]);

  return (
    <Input
      placeholder="input search text"
      // enterButton="Search"
      // suffix={suffix}
      // onSearch={onSearch}
      onChange={(e) => SetSearch(e.target.value)}
      allowClear
      placeholder="input search loading default"
      loading={true}
    />
  );
};

export default SearchItem;
