import React from 'react';

const Recipe = React.lazy(() => import('./Recipe'));
const Recipes = React.lazy(() => import('./Recipes'));
const MyRecipes = React.lazy(() => import('./MyRecipes'));

const routes = [
  {
    path: '/recipes',
    component: Recipes,
    exact: true
  },
  {
    path: '/recipes/:id',
    component: Recipe,
  },
  {
    path:'/my-recipes',
    component: MyRecipes,
  }
];

export default routes;
