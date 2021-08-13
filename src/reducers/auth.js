import { AUTHENTICATE } from '../constant/auth';

const initialState = {
  authenticate: false,
  authenticating: false,
  information: null,
  message: '',
  token: null,
  user: '',
};

export default function Auth(state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATE.LOGIN_REQUEST:
      return (state = {
        ...state,
        authenticating: true,
      });
    case AUTHENTICATE.LOGIN_SUCCESS:
      let { token, user } = action.payload;
      return (state = {
        ...state,
        authenticating: false,
        authenticate: true,
        token,
        user,
      });
    case AUTHENTICATE.LOGIN_FAILURE:
      return (state = {
        ...state,
        authenticating: false,
        message: action.payload.message,
      });
    case AUTHENTICATE.REGISTER_REQUEST:
      return (state = {
        ...state,
        authenticating: true,
      });
    case AUTHENTICATE.REGISTER_SUCCESS:
      return (state = {
        ...state,
        authenticating: false,
        authenticate: true,
        information: action.payload.data,
      });
    case AUTHENTICATE.REGISTER_FAILURE:
      return (state = {
        ...state,
        authenticating: false,
        message: action.payload.message,
      });
    default:
      return state;
  }
}
