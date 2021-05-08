// import { Redirect } from 'react-router-dom';
import { Route, Redirect } from 'react-router-dom';
import {isUserAuthenticated} from '../helpers/authHelper'

import HomeComponent from '../pages/public/index'
import Albums from '../pages/user/albumList'
import AlbumDetail from '../pages/user/albumDetail'

// Authentication checking
const PrivateRoute = ({component: Component, ...rest}) => (
    <Route
        {...rest}
        render={(props)=>{
            if (!isUserAuthenticated()) {
                // not logged in so redirect to login page with the return url
                return <Redirect to={{ pathname: '/', state: { from: props.location } }} />;
            }
            return <Component {...props} />
        }}
    />
)
// Routes configurations
const home={
    path: '/',
    component: HomeComponent,
    route: Route,
};

const userAlbums = {
    path: '/albums',
    component: Albums,
    route: PrivateRoute,
}

const albumDetail = {
    path: '/albums/:id',
    component: AlbumDetail,
    route: PrivateRoute,
}

const allRoutes=[
   home,
   userAlbums,
   albumDetail
];

export {allRoutes}