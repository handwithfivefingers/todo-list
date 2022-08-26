import axios from './../helper/AxiosService';

const api_path = {
  getAll: '/project'
};

const ProjectService = {
  getAll: (params) => axios.get(api_path.getAll, params),
};

export default ProjectService;
