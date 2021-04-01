import Loadable from 'react-loadable';
import Loader from './Loader';

// NOTE: always import screens like the one below
// it will dynamicall load pages so as to reduce
// download size for the actual package

const Home = Loadable({
  loader: () => import('./Home'),
  loading: Loader,
});

const Settings = Loadable({
  loader: () => import('./Settings'),
  loading: Loader,
});

const Subreddit = Loadable({
  loader: () => import('./Subreddit'),
  loading: Loader,
});

const NotFound = Loadable({
  loader: () => import('./NotFound'),
  loading: Loader,
});

export { Home, Settings, Subreddit, NotFound };
