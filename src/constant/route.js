import Login from '../containers/Login';
import Profile from '../containers/Profile';
import Register from '../containers/Register';
import Home from './../containers/Home';
import Project from './../containers/Project';
import TaskBoard from './../containers/TaskBoard';


export const TASK_ROUTE = [
  {
    path: '/',
    name: 'Home',
    exact: true,
    component: Home,
  },
  {
    path: '/project/:slug',
    name: 'Taskboard',
    component: TaskBoard,
  },
  {
    path: '/project',
    name: 'Project',
    component: Project,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },

  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
];