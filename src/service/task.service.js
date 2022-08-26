import axios from './../helper/AxiosService';

const api_path = {
  getAll: '/task'
};

const TaskService = {
  getAll: (params) => axios.post(api_path.getAll, params),
};

export default TaskService;
