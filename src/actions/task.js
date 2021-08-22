import axios from './../helper/AxiosService';
import { TASK } from './../constant/task';
import { message } from 'antd';
export const fetchListTask = (id) => {
  return async (dispatch) => {
    dispatch({
      type: TASK.FETCH_TASK_REQUEST,
    });
    const res = await axios.post(`/initialdata`, { id });
    if (res.status === 200) {
      const { tasks, project } = res.data;
      dispatch({
        type: TASK.FETCH_TASK_SUCCESS,
        payload: {
          tasks,
          project,
        },
      });
    } else {
      dispatch({
        type: TASK.FETCH_TASK_FAILURE,
        payload: {
          message: 'Lỗi network, vui lòng thử lại sau !',
        },
      });
    }
  };
};
// Setting Editting
export const Task_Editing = (task) => {
  return async (dispatch) => {
    dispatch({
      type: TASK.TASK_EDITING,
      payload: {
        task,
      },
    });
  };
};
// Update Task
export const EditTask = (form) => {
  return async (dispatch) => {
    dispatch({
      type: TASK.TASK_EDIT_REQUEST,
    });
    const res = await axios.post(`/task/update`, form);
    if (res.status === 201) {
      dispatch({
        type: TASK.TASK_EDIT_SUCCESS,
        payload: {
          task: res.data.task,
        },
      });
      message.success('Updated Task successfully');
    } else {
      dispatch({
        type: TASK.TASK_EDIT_FAILURE,
        payload: {
          message: 'Lỗi network, vui lòng thử lại sau !',
        },
      });
    }
  };
};

export const AddNewTask = (form) => {
  return async (dispatch) => {
    dispatch({
      type: TASK.TASK_ADD_NEW_REQUEST,
    });
    const res = await axios.post(`/task/create`, form);
    console.log(res);
    if (res.status === 201) {
      dispatch({
        type: TASK.TASK_ADD_NEW_SUCCESS,
        payload: {
          data: res.data,
        },
      });
      message.success('Task created successfully');
    } else {
      dispatch({
        type: TASK.TASK_ADD_NEW_FAILURE,
        payload: {
          message: 'Lỗi network, vui lòng thử lại sau !',
        },
      });
    }
  };
};

export const Delete_Task = (task) => {
  return async (dispatch) => {
    dispatch({
      type: TASK.TASK_DELETE_REQUEST,
    });
    const res = await axios.post(`/task/delete`, task);
    console.log(res);
    if (res.status === 200) {
      dispatch({
        type: TASK.TASK_DELETE_SUCCESS,
        payload: {
          data: task,
        },
      });
      message.success('Task deleted !');
    } else {
      dispatch({
        type: TASK.TASK_DELETE_FAILURE,
        message: 'Something went wrong',
      });
    }
  };
};

export const SearchTask = (search) => {
  return async (dispatch) => {
    dispatch({
      type: TASK.TASK_SEARCH_REQUEST,
    });
    const res = await axios.post(`/task/search/`, search);
    // console.log(res);
    if (res.status === 200) {
      const { task } = res.data;
      dispatch({
        type: TASK.TASK_SEARCH_SUCCESS,
        payload: task,
      });
    } else {
      dispatch({
        type: TASK.TASK_SEARCH_FAILURE,
        payload: { message: res.data },
      });
    }
  };
};
