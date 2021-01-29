import { FunctionComponent, ComponentClass } from 'react';
import { Home } from '../screens';
import Settings from '../screens/Settings';

type RouteType = {
  key: string;
  path?: string;
  link?: string;
  component: FunctionComponent<any> | ComponentClass<any, any>;
  exact?: boolean;
};

export const routes: RouteType[] = [
  {
    key: 'home',
    link: '/',
    component: Home,
    exact: true,
  },
  {
    key: 'settings',
    link: '/settings',
    component: Settings,
  },
];
