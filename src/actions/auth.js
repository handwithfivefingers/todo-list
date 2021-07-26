import { AUTHENTICATE } from './../constant/auth';
import axios from './../helper/AxiosService';
export const LoginUser = (form) => {
  return async (dispatch) => {
    dispatch({
      type: AUTHENTICATE.LOGIN_REQUEST,
    });
    const res = await axios.post('/signin', form);
    if (res.status === 200) {
      dispatch({
        type: AUTHENTICATE.LOGIN_SUCCESS,
        payload: {
          data: res.data,
        },
      });
    } else {
      dispatch({
        type: AUTHENTICATE.LOGIN_FAILURE,
        payload: {
          message: res.data,
        },
      });
    }
  };
};
export const RegisterUser = (form) => {
  return async (dispatch) => {
    dispatch({
      type: AUTHENTICATE.REGISTER_REQUEST,
    });
    const res = await axios.post('/signup', form);
    console.log(res);
    if (res.status === 201) {
      const { message } = res.data;
      dispatch({
        type: AUTHENTICATE.REGISTER_SUCCESS,
        payload: {
          data: res.data,
        },
      });
    } else {
      dispatch({
        type: AUTHENTICATE.REGISTER_FAILURE,
        payload: {
          message: res.data,
        },
      });
    }
  };
};
