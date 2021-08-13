import React, { useState, useEffect } from 'react';
import { Input, Space } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { SearchTask } from '../../actions/task';
const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);

const SearchItem = ({ projectId }) => {
  const [search, SetSearch] = useState('');
  const dispatch = useDispatch();
  // const onSearch = (value) => {
  //   dispatch(fetchListTask(value));
  //   console.log(value);
  // };
  // const OnSearch = (e) => {
  //   e.preventDefault();
  //   const form = new FormData();
  //   form.append('search', e.target.value);
  //   return form;
  // };
  useEffect(() => {
    console.log(projectId);
    const SearchTimeout = setTimeout(() => {
      const form = new FormData();
      form.append('search', search);
      form.append('project', projectId);
      dispatch(SearchTask(form));
    }, 1000)
    return () => clearTimeout(SearchTimeout);
  }, [search]);

  return (
    <Input
      placeholder="input search text"
      // enterButton="Search"
      // suffix={suffix}
      // onSearch={onSearch}
      onChange={(e) => SetSearch(e.target.value)}
      allowClear
      placeholder="Finding Nemo ?"
      loading={true}
    />
  );
};

export default SearchItem;
