import axios from './../helper/AxiosService';
import { projectConst } from './../constant/project';
export const createProject = (form) => {
  return async (dispatch) => {
    dispatch({
      type: projectConst.PRO_CREATE_REQUEST
    })
    const res = await axios.post(`/project/create`, form);
    console.log(res);
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