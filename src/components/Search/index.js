import { Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { SearchTask } from '../../actions/task';

const SearchItem = ({ projectId }) => {
  const [search, SetSearch] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
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
      // enterButton="Search"
      // suffix={suffix}
      // onSearch={onSearch}
      onChange={(e) => SetSearch(e.target.value)}
      allowClear
      placeholder="Finding Nemo ?"
    />
  );
};

export default SearchItem;
