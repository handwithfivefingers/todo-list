import { combineReducers } from 'redux';
import taskReducer from './task';
import authReducer from './auth';
const rootReducer = combineReducers({
  taskReducer,
  authReducer,
});
export default rootReducer;
