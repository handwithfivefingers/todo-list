import axios from './../helper/AxiosService';
import { projectConst } from './../constant/project';
import { message } from 'antd';
export const createProject = (form) => {
  return async (dispatch) => {
    dispatch({
      type: projectConst.PRO_CREATE_REQUEST
    })
    const res = await axios.post(`/project/create`, form);
    if (res.status === 201) {
      const { project } = res.data;
      dispatch({
        type: projectConst.PRO_CREATE_SUCCESS,
        payload: {
          project
        }
      })
    } else {
      dispatch({
        type: projectConst.PRO_EDITTING_FAILURE,
        payload: {
          message: 'Something wrong here'
        }
      })
    }
  }
};
export const projectEditting = (projecteditting) => {
  return (dispatch) => {
    dispatch({
      type: projectConst.PRO_EDITTING,
      payload: { projecteditting }
    })
  }
}
export const projectUpdate = (form) => {
  return async (dispatch) => {
    dispatch({
      type: projectConst.PRO_EDITTING_REQUEST,
    })
    const res = await axios.post('/project/update', form);
    if (res.status === 201) {
      // console.log(res);
      dispatch({
        type: projectConst.PRO_EDITTING_SUCCESS,
        payload: res.data
      })
    } else {
      dispatch({
        type: projectConst.PRO_EDITTING_FAILURE,
        payload: {
          message: res.data
        }
      })
    }
  }
}

export const projectDelete = (project) => {
  return async (dispatch) => {
    dispatch({
      type: projectConst.PRO_DELETE_REQUEST,
    });
    const res = await axios.post(`/project/delete`, project);
    if (res.status === 200) {
      dispatch({
        type: projectConst.PRO_DELETE_SUCCESS,
        payload: {
          project
        },
      });
      message.success('Project created successfully');
    } else {
      dispatch({
        type: projectConst.PRO_DELETE_FAILURE,
        message: 'Something went wrong',
      });
    }
  };
}