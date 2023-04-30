import Main from './pages/Main';
import Users from './pages/Users';
import About from './pages/About';

export interface RouteSchema {
  key: string;
  path: string;
  component: React.ComponentClass | React.FunctionComponent;
}

export const ROUTES: RouteSchema[] = [
  {
    key: '',
    path: '/user',
    component: Users,
  },
  {
    key: 'main',
    path: '/',
    component: Main,
  },
  {
    key: 'about',
    path: '/about',
    component: About,
  },
];
