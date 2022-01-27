import React from 'react';

const About = React.lazy(() => import('./About'));

const routes = [
  {
    path: '/about',
    component: About
  }
];

export default routes;
