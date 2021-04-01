import { FunctionComponent, ComponentClass } from 'react';
import { Home, Settings, Subreddit, NotFound } from '../screens';

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
  {
    key: 'subreddit',
    link: '/r/:name/:sort',
    component: Subreddit,
  },
  {
    key: '404',
    link: '*',
    component: NotFound,
  },
];
