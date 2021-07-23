import axios from './../helper/AxiosService';
import { TASK } from './../constant/task';

export const fetchListTask = (params) => {
  return async (dispatch) => {
    dispatch({
      type: TASK.FETCH_TASK_REQUEST,
    });

     const res = await axios.get(`/tasks?q=${params ? params : ''}`);

    if (res.status === 200) {
      dispatch({
        type: TASK.FETCH_TASK_SUCCESS,
        payload: {
          data: res.data,
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

export const Task_Editing = (task) => {
  console.log(task);
  return async (dispatch) => {
    dispatch({
      type: TASK.TASK_EDITING,
      payload: {
        task,
      },
    });
  };
};

export const EditTask = (form, id) => {
  return async (dispatch) => {
    dispatch({
      type: TASK.TASK_EDIT_REQUEST,
    });
    const res = await axios.put(`/tasks/${id}`, form);
    if (res.status === 200) {
      dispatch({
        type: TASK.TASK_EDIT_SUCCESS,
        payload: {
          data: res.data,
        },
      });
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
    const res = await axios.post(`/tasks`, form);
    console.log(res);
    if (res.status === 201) {
      dispatch({
        type: TASK.TASK_ADD_NEW_SUCCESS,
        payload: {
          data: res.data,
        },
      });
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
    const res = await axios.delete(`/tasks/${task.id}`);
    console.log(res);
    if (res.status === 200) {
      dispatch({
        type: TASK.TASK_DELETE_SUCCESS,
        payload: {
          data: task,
        },
      });
    } else {
      dispatch({
        type: TASK.TASK_DELETE_FAILURE,
        message: 'Something went wrong',
      });
    }
  };
};

export const SearchTask = (params) => {
  return async (dispatch) => {
    dispatch({
      type: TASK.TASK_SEARCH_REQUEST,
    });
    const res = await axios.get(`/tasks?q=${params}`);
    console.log(res);
  };
};
