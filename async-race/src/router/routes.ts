import { Route } from '../type';
import NotFound404Page from '../components/404Page';
import PageGarageView from '../components/page-garage-view';
import PageWinnersView from '../components/page-winners-view';

const routes: Route[] = [
  {
    path: '/',
    Component: PageGarageView,
  },
  {
    path: '/garage',
    Component: PageGarageView,
  },
  {
    path: '/winners',
    Component: PageWinnersView,
  },
  {
    path: '**',
    Component: NotFound404Page,
  },
];

export default routes;
