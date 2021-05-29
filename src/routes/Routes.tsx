import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import PrivateRoute from '../components/atoms/PrivateRoute';

const WelcomePage = React.lazy(() => import('../pages/WelcomePage'));

const ToDoPage = () => <p>TO-DO LIST </p>;
const ToDoFavoritesPage = () => <p>TO-DO FAVORITES LIST </p>;

export default function Routes() {
  return (
    <React.Suspense fallback={<>Loading...</>}>
      <BrowserRouter>
        <Switch>
          <PrivateRoute path="/to-do" component={ToDoPage} exact />
          <PrivateRoute
            path="/to-do/favorites"
            component={ToDoFavoritesPage}
            exact
          />
          <Route path="/" component={WelcomePage} exact />
        </Switch>
      </BrowserRouter>
    </React.Suspense>
  );
}
