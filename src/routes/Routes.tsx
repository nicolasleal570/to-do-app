import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

const WelcomePage = React.lazy(() => import('../pages/WelcomePage'));

export default function Routes() {
  return (
    <React.Suspense fallback={<>Loading...</>}>
      <BrowserRouter>
        <Switch>
          <Route path="/to-do" render={() => <p>TO-DO LIST</p>} exact />
          <Route
            path="/to-do/favorites"
            render={() => <p>TO-DO LIST FAVORITES</p>}
            exact
          />
          <Route path="/" component={WelcomePage} exact />
        </Switch>
      </BrowserRouter>
    </React.Suspense>
  );
}
