import { AUTHENTICATE } from '../constant/auth';

const initialState = {
  authenticate: false,
  authenticating: false,
  information: null,
  message: '',
};

export default function Auth(state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATE.LOGIN_REQUEST:
      return {
        ...state,
        authenticating: true,
      };
    case AUTHENTICATE.LOGIN_SUCCESS:
      let { token, user } = action.payload;
      return {
        ...state,
        authenticating: false,
        authenticate: true,
      };
    case AUTHENTICATE.LOGIN_FAILURE:
      return {
        ...state,
        authenticating: false,
        message: action.payload.message,
      };
    case AUTHENTICATE.REGISTER_REQUEST:
      return {
        ...state,
        authenticating: true,
      };
    case AUTHENTICATE.REGISTER_SUCCESS:
      return {
        ...state,
        authenticating: false,
        authenticate: true,
      };
    case AUTHENTICATE.REGISTER_FAILURE:
      return {
        ...state,
        authenticating: false,
        message: action.payload.message,
      };
    case AUTHENTICATE.LOGOUT_SUCCESS:
      return state;
    default:
      return state;
  }
}
