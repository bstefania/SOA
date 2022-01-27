import React from 'react';

const LogIn = React.lazy(() => import('./LogIn'));
const SignUp = React.lazy(() => import('./SignUp'));

const routes = [
  {
    path: '/log-in',
    component: LogIn
  },
  {
    path: '/sign-up',
    component: SignUp
  }
];

export default routes;
