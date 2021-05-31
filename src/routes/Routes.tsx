import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import PrivateRoute from '../components/atoms/PrivateRoute';
import Loader from '../components/atoms/Loader';

const WelcomePage = React.lazy(() => import('../pages/WelcomePage'));
const ToDosPage = React.lazy(() => import('../pages/ToDosPage'));
const ToDosFavoritesPage = React.lazy(
  () => import('../pages/ToDosFavoritesPage')
);

export default function Routes() {
  return (
    <React.Suspense fallback={<Loader centeredOnScreen />}>
      <BrowserRouter>
        <Switch>
          <PrivateRoute path="/to-do" component={ToDosPage} exact />
          <PrivateRoute
            path="/to-do/favorites"
            component={ToDosFavoritesPage}
            exact
          />
          <Route path="/" component={WelcomePage} exact />
        </Switch>
      </BrowserRouter>
    </React.Suspense>
  );
}
