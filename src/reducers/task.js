import { TASK } from './../constant/task';
import { MODAL } from './../constant/modal';
import { projectConst } from '../constant/project';
const initState = {
  tasks: [],
  project: [],
  loading: false,
  message: '',
  showModal: false,
  taskediting: null,
  projecteditting: null,
  modal: null,
  animation: false,
};
// const findIndex = (array, item) => {
//   const result = array.findIndex((arr) => arr.id === item.id);
//   return result;
// };
const UpdateStateByIndex = (array, newdata, id) => {
  let index = -1;
  const currentTask = array;
  index = currentTask.findIndex(
    (arr) => arr._id === id
  );
  const returnTask = [
    ...currentTask.slice(0, index),
    newdata,
    ...currentTask.slice(index + 1),
  ];
  return returnTask
};

export default function tasks(state = initState, action) {
  let index = -1;
  switch (action.type) {
    case TASK.FETCH_TASK_REQUEST:
      return (state = {
        ...state,
        loading: true,
      });
    case TASK.FETCH_TASK_SUCCESS:
      const { tasks, project } = action.payload;
      return (state = {
        ...state,
        loading: false,
        tasks,
        project,
      });
    case TASK.FETCH_TASK_FAILURE:
      return (state = {
        tasks: [],
        loading: false,
        message: action.payload,
      });
    case TASK.TASK_EDITING:
      const { task } = action.payload;
      return (state = {
        ...state,
        taskediting: task,
      });
    case MODAL.MODAL_SHOW:
      return (state = {
        ...state,
        showModal: true,
      });
    case MODAL.MODAL_HIDE:
      return (state = {
        ...state,
        taskediting: null,
        projecteditting: null,
        showModal: false,
        modal: null,
      });
    case MODAL.MODAL_CHANGE_TITLE:
      return (state = {
        ...state,
        modal: action.payload.data,
      });
    case TASK.TASK_EDIT_REQUEST:
      return (state = {
        loading: true,
        ...state,
      });
    case TASK.TASK_EDIT_SUCCESS:
      const item = action.payload.task;
      const newTasksEdit = state.tasks;
      index = state.tasks.findIndex((arr) => arr._id === item._id);
      if (index !== -1) {
        const newtasksEdit = [
          // Lấy phần tử từ 0 -> index
          ...newTasksEdit.slice(0, index),
          // Thêm phần tử index
          item,
          // Lấy tiếp phần tử từ index + 1
          ...newTasksEdit.slice(index + 1),
        ];

        return (state = {
          ...state,
          tasks: newtasksEdit,
          loading: false,
        });
      } else {
        return (state = {
          ...state,
          loading: false,
        });
      }
    case TASK.TASK_EDIT_FAILURE:
      console.log(state.tasks);
      return (state = {
        ...state,
        loading: false,
        message: action.payload,
      });
    case TASK.TASK_ADD_NEW_REQUEST:
      console.log(state.tasks);
      return (state = {
        loading: true,
        ...state,
      });
    case TASK.TASK_ADD_NEW_SUCCESS:
      console.log(state.tasks);
      const AddTasks = state.tasks;
      return (state = {
        ...state,
        loading: false,
        tasks: [...AddTasks, action.payload.data.task],
      });
    case TASK.TASK_ADD_NEW_FAILURE:
      console.log(state.tasks);
      return (state = {
        ...state,
        loading: false,
        message: action.payload,
      });
    case TASK.TASK_DELETE_REQUEST:
      console.log(state.tasks);
      return (state = {
        ...state,
        loading: true,
      });
    case TASK.TASK_DELETE_SUCCESS:
      console.log(action.payload);
      const currentTask = state.tasks;
      index = state.tasks.findIndex(
        (arr) => arr._id === action.payload.data._id
      );
      const returnTask = [
        ...currentTask.slice(0, index),
        ...currentTask.slice(index + 1),
      ];
      return (state = {
        ...state,
        tasks: returnTask,
        loading: false,
      });

    case TASK.TASK_DELETE_FAILURE:
      console.log(state.tasks);
      return (state = {
        ...state,
        message: action.payload,
        loading: false,
      });
    case TASK.TASK_SEARCH_REQUEST:
      return (state = {
        ...state,
        loading: true,
        animation: true,
      });
    case TASK.TASK_SEARCH_SUCCESS:
      return (state = {
        ...state,
        loading: false,
        animation: false,
        tasks: action.payload,
      });
    case TASK.TASK_SEARCH_FAILURE:
      return (state = {
        ...state,
        loading: false,
        animation: false,
        message: action.payload,
      });
    case projectConst.PRO_EDITTING:
      const { projecteditting } = action.payload;
      // console.log(action.payload)
      return {
        ...state,
        projecteditting
      }
    case projectConst.PRO_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case projectConst.PRO_EDITTING_SUCCESS:
      let data = action.payload.project;
      // console.log(data, action.payload);
      return {
        ...state,
        loading: false,
        project: UpdateStateByIndex(state.project, data, data._id),
      }
    case projectConst.PRO_EDITTING_FAILURE:
      return {
        ...state,
        loading: false,
      }
    default:
      return state;
  }
}
