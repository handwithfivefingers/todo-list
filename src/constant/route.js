import NotFound from '../containers/404';
import Login from '../containers/Login';
import Profile from '../containers/Profile';
import Register from '../containers/Register';
import Home from './../containers/Home';
import Project from './../containers/Project';
import TaskBoard from './../containers/TaskBoard';
import store from './../store/configureStore';
export const TASK_SIDE = [
  {
    path: '/',
    name: 'Home',
    exact: true,
    component: Home,
  },
  {
    path: '/project',
    name: 'Project',
    component: Project,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  // {
  //   path: '/register',
  //   name: 'Register',
  //   component: Register,
  // },
];
export const TASK_ROUTE = [
  {
    path: '/',
    name: 'Home',
    exact: true,
    component: Home,
  },
  {
    path: '/project/:slug',
    name: 'Project',
    component: TaskBoard,
  },
  {
    path: '/project',
    name: 'Project',
    component: Project,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '*',
    name: 'Not Found',
    component: NotFound,
  },
];
export const PROFILE_ROUTE = [

]