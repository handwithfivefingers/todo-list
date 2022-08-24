import { AUTHENTICATE } from './../constant/auth';
import { message } from 'antd';
import AuthenticateService from '../service/authenticate.service';

export const LoginUser = (form) => {
  return async (dispatch) => {
    dispatch({
      type: AUTHENTICATE.LOGIN_REQUEST,
    });

    try {
      let res = await AuthenticateService.Login(form);
      if (res) {
        dispatch({
          type: AUTHENTICATE.LOGIN_SUCCESS,
        });
        message.success('Đăng nhập thành công!');
      }
    } catch (err) {
      let res = err.response.data;
      dispatch({
        type: AUTHENTICATE.LOGIN_FAILURE,
        payload: {
          message: res.message,
        },
      });
      message.error(err.response.data.message);
    }
  };
};
export const RegisterUser = (form) => {
  return async (dispatch) => {
    dispatch({
      type: AUTHENTICATE.REGISTER_REQUEST,
    });

    try {
      const res = await AuthenticateService.Register(form);
      if (res) {
        dispatch({
          type: AUTHENTICATE.REGISTER_SUCCESS,
        });
        message.success('Đăng kí tài khoản thành công !');
      }
    } catch (err) {
      dispatch({
        type: AUTHENTICATE.REGISTER_FAILURE,
        payload: {
          message: err.response.data.message,
        },
      });
      message.error(err.response.data.message);
    }
  };
};

export const isUserLogIn = () => {
  return async (dispatch) => {
    dispatch({
      type: AUTHENTICATE.LOGIN_REQUEST,
    });

    try {
      const res = await AuthenticateService.Authenticate();
      if (res.status === 200) {
        dispatch({
          type: AUTHENTICATE.LOGIN_SUCCESS,
        });
      }
    } catch (err) {
      dispatch({
        type: AUTHENTICATE.LOGIN_FAILURE,
        payload: {
          message: err.response.data || 'error',
        },
      });
    }
  };
};

export const userLogout = () => {
  return async (dispatch) => {
    dispatch({
      type: AUTHENTICATE.LOGIN_REQUEST,
    });
    try {
      await AuthenticateService.Logout();
      dispatch({
        type: AUTHENTICATE.LOGOUT_SUCCESS,
      });
    } catch (err) {
      document.cookie = '';
      dispatch({
        type: AUTHENTICATE.LOGOUT_SUCCESS,
      });
    }
  };
};
