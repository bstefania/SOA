import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navigation from './Navigation';
import localRoutes from './routes';
import aboutRoutes from 'federation_demo_about/routes';
import authRoutes from 'federation_demo_auth/routes';
import recipesRoutes from 'federation_demo_recipes/routes';

const routes = [...localRoutes, ...aboutRoutes, ...authRoutes, ...recipesRoutes];

const App = () => {

  return (
    <BrowserRouter>
      <div className="tab">
        <Navigation />
        <React.Suspense fallback={<div>Loading...</div>}>
          <Switch>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                component={route.component}
                exact={route.exact}
              />
            ))}
          </Switch>
        </React.Suspense>
      </div>
    </BrowserRouter>
  );
};

export default App;
