import { Input, Select, Space, DatePicker } from 'antd';
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
    <>
      <Input.Group compact>
        <Input.Search
          onChange={(e) => SetSearch(e.target.value)}
          onSearch={(e) => SetSearch(e)}
          allowClear
          placeholder="Search..."
          style={{ width: '50%' }}
        />
        <Select placeholder='Filter' onSelect={() => { }} style={{ width: '25%' }}>
          <Select.Option value={0}>
            To do
          </Select.Option>
          <Select.Option value={1}>
            In Progress
          </Select.Option>
          <Select.Option value={2}>
            Done
          </Select.Option>
          <Select.Option value={3}>
            Issue
          </Select.Option>
        </Select>
        <DatePicker style={{ width: '25%' }} />
      </Input.Group>
    </>
  );
};

export default SearchItem;
