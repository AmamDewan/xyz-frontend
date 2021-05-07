// import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';

import HomeComponent from '../pages/public/index'
import Albums from '../pages/user/albumList'
import AlbumDetail from '../pages/user/albumDetail'

// Authentication checking

// Routes configurations
const home={
    path: '/',
    component: HomeComponent,
    route: Route,
};

const userAlbums = {
    path: '/albums',
    component: Albums,
    route: Route,
}

const albumDetail = {
    path: '/album-details',
    component: AlbumDetail,
    route: Route,
}

const allRoutes=[
   home,
   userAlbums,
   albumDetail
];

export {allRoutes}