import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';

import HomeComponent from '../pages/public/index'

const home={
    path: '/',
    component: HomeComponent,
    route: Route,
};

const allRoutes=[
   home,
];

export {allRoutes}